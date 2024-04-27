import { ethers } from "ethers";
import {
  defaultNextBlockToIndex,
  docClient,
  dynamodbAllAddressesToPnlTableName,
  dynamodbLastSyncedBlockTableName,
  provider,
} from "./constants";

import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  indexIncreasePosition,
  isIncreasePosition,
} from "./index-increase-position-service";
import {
  indexDecreasePosition,
  isDecreasePosition,
} from "./index-decrease-position-service";
import { indexPriceUpdate, isPriceUpdated } from "./index-price-update";
import {
  indexLiquidatePosition,
  isLiquidatePosition,
} from "./index-liquidate-position-service";
import { AddressToPnl } from "./types";

export async function getNextBlockNumberToIndex(
  currentBlockNumber: number
): Promise<number | undefined> {
  const lastSyncedBlockFromDb = await getLastSyncedBlockFromDb();
  if (lastSyncedBlockFromDb !== undefined) {
    if (lastSyncedBlockFromDb < currentBlockNumber) {
      return lastSyncedBlockFromDb + 1;
    } else {
      return undefined;
    }
  } else {
    console.log(defaultNextBlockToIndex);
    return defaultNextBlockToIndex;
  }
}

export async function synchronizeBlocks(blockNumbers: number[]): Promise<void> {
  const indexableTransactions = (
    await Promise.all(
      blockNumbers.map(async (blockNumber) => {
        const block = await provider.getBlock(blockNumber);
        return (
          await Promise.all(
            block.transactions.map(async (transactionHash) => {
              const receipt = await provider.getTransactionReceipt(
                transactionHash
              );
              if (
                isTransactionNotFailed(receipt) &&
                (isIncreasePosition(receipt) ||
                  isDecreasePosition(receipt) ||
                  isPriceUpdated(receipt) ||
                  isLiquidatePosition(receipt))
              ) {
                return receipt;
              }
            })
          )
        ).filter((receipt) => receipt !== undefined);
      })
    )
  ).flat();

  if (indexableTransactions.length > 0) {
    console.log("Indexable transactions");

    for (let i = 0; i < indexableTransactions.length; i++) {
      const prices = await indexPriceUpdate(indexableTransactions[i]);
      await indexIncreasePosition(indexableTransactions[i], prices);
      await indexDecreasePosition(indexableTransactions[i], prices);
      await indexLiquidatePosition(indexableTransactions[i]);
    }
  }

  await setBlockSynced(blockNumbers[blockNumbers.length - 1]);
}

async function getLastSyncedBlockFromDb(): Promise<number | undefined> {
  const query = new QueryCommand({
    TableName: dynamodbLastSyncedBlockTableName,
    KeyConditionExpression: "#key = :key",
    ExpressionAttributeNames: { "#key": "partition" },
    ExpressionAttributeValues: { ":key": "ALL" },
    Limit: 1,
    ScanIndexForward: false,
  });
  const result = (await docClient.send(query)).Items;
  if (result.length > 0) {
    return result[0].blockNumber;
  }
}

async function setBlockSynced(blockNumber: number): Promise<void> {
  const command = new PutCommand({
    TableName: dynamodbLastSyncedBlockTableName,
    Item: { blockNumber: blockNumber, partition: "ALL" },
  });
  await docClient.send(command);
}

export async function getAddressToPnl(address: string): Promise<AddressToPnl> {
  const query = new QueryCommand({
    TableName: dynamodbAllAddressesToPnlTableName,
    KeyConditionExpression: "#key = :key AND #address = :addressValue",
    ExpressionAttributeNames: { "#key": "partition", "#address": "address" },
    ExpressionAttributeValues: { ":key": "ALL", ":addressValue": address },
  });
  const result = (await docClient.send(query)).Items;
  if (result.length > 0) {
    return result[0] as AddressToPnl;
  } else {
    return {
      partition: "ALL",
      address: address,
      pnl: 0.0,
    };
  }
}

export async function saveAddressToPnl(
  addressToPnl: AddressToPnl
): Promise<void> {
  const command = new PutCommand({
    TableName: dynamodbAllAddressesToPnlTableName,
    Item: addressToPnl,
  });
  await docClient.send(command);
}

function isTransactionNotFailed(
  transaction: ethers.providers.TransactionReceipt
) {
  const notFailed = transaction.status !== 0;
  if (!notFailed) {
    console.log(`Transaction: ${transaction.transactionHash} failed`);
  }
  return notFailed;
}
