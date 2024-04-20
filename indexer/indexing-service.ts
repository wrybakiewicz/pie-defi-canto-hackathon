import { ethers } from "ethers";
import {
  defaultNextBlockToIndex,
  docClient,
  dynamodbLastSyncedBlockTableName,
  provider,
} from "./constants";

import { abi as PositionRouter } from "./abis/PositionRouter.json";

import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

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
              const contractInterface = new ethers.utils.Interface(
                PositionRouter
              );
              const receiptCheckResult = receipt.logs.map((log) => {
                const event = contractInterface.parseLog(log);
                console.log("Event Name:", event.name);
                console.log("Event Values:", event.args);
                return event.name === "ExecuteIncreasePosition";
              });
              if (receiptCheckResult.some((result) => result)) {
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
    console.log(indexableTransactions);
  }

  //TODO: do actual sync

  setBlockSynced(blockNumbers[blockNumbers.length - 1]);
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
