import { BigNumber, ethers } from "ethers";
import { abi as PositionRouter } from "./abis/PositionRouter.json";
import { abi as Vault } from "./abis/Vault.json";
import { Position } from "./types";
import { getTokenSymbol } from "./token-address-to-token-symbol";
import {
  docClient,
  dynamodbPositionsFromTableName,
  positionRouterAddress,
  provider,
  vaultAddress,
} from "./constants";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getAddressToPnl, saveAddressToPnl } from "./indexing-service";
import { Block } from "typescript";

export async function indexDecreasePosition(
  result: {
    receipt: ethers.providers.TransactionReceipt;
    block: ethers.providers.Block;
  },
  prices: Map<string, number>
): Promise<void> {
  if (isDecreasePosition(result.receipt)) {
    console.log(`Handling decreasing position`);
    const contractInterface = new ethers.utils.Interface(PositionRouter);
    for (let i = 0; i < result.receipt.logs.length; i++) {
      try {
        const log = result.receipt.logs[i];
        const event = contractInterface.parseLog(log);
        if (
          event.name === "ExecuteDecreasePosition" &&
          log.address.toLowerCase() === positionRouterAddress
        ) {
          try {
            const token = getTokenSymbol(event.args.indexToken);
            const pnl = getPnl(result.receipt);
            const address = event.args.account.toLowerCase();
            const position: Position = {
              account: address,
              tradingToken: token,
              positionSizeInUsd:
                event.args.sizeDelta
                  .div(BigNumber.from(10).pow(25))
                  .toNumber() / 100000.0,
              tradingTokenPrice:
                prices.get(token) ??
                event.args.acceptablePrice
                  .div(BigNumber.from(10).pow(25))
                  .toNumber() / 100000.0,
              isLong: event.args.isLong,
              timestampSeconds: result.block.timestamp,
              type: "DECREASE",
              pnl: pnl,
              transactionHash: result.receipt.transactionHash,
              blockNumber: result.receipt.blockNumber,
            };
            const command = new PutCommand({
              TableName: dynamodbPositionsFromTableName,
              Item: position,
            });
            try {
              await docClient.send(command);
              const addressToPnl = await getAddressToPnl(address);
              await saveAddressToPnl({
                partition: "ALL",
                address: address,
                pnl: addressToPnl.pnl + pnl,
              });
            } catch {
              await docClient.send(command);
              const addressToPnl = await getAddressToPnl(address);
              await saveAddressToPnl({
                partition: "ALL",
                address: address,
                pnl: addressToPnl.pnl + pnl,
              });
            }
          } catch (e) {
            console.error("Error decreasing position:");
            console.error(e);
            console.error("Error decreasing event:");
            console.error(event);
          }
        }
      } catch (e) {}
    }
  }
}

export function isDecreasePosition(
  transaction: ethers.providers.TransactionReceipt
): boolean {
  const contractInterface = new ethers.utils.Interface(PositionRouter);
  const receiptCheckResult = transaction.logs.map((log) => {
    try {
      const event = contractInterface.parseLog(log);
      return (
        event.name === "ExecuteDecreasePosition" &&
        log.address.toLowerCase() === positionRouterAddress
      );
    } catch (e) {
      return false;
    }
  });
  return receiptCheckResult.some((result) => result);
}

function getPnl(transaction: ethers.providers.TransactionReceipt): number {
  const contractInterface = new ethers.utils.Interface(Vault);
  const results = transaction.logs
    .map((log) => {
      try {
        const event = contractInterface.parseLog(log);
        if (
          event.name === "UpdatePnl" &&
          log.address.toLowerCase() === vaultAddress
        ) {
          const hasProfitMultiplier = event.args.hasProfit ? 1 : -1;
          return (
            hasProfitMultiplier *
            (event.args.delta.div(BigNumber.from(10).pow(25)).toNumber() /
              100000.0)
          );
        }
      } catch (e) {}
    })
    .filter((result) => result !== undefined);
  if (results.length > 0) {
    return results[0];
  } else {
    return 0;
  }
}
