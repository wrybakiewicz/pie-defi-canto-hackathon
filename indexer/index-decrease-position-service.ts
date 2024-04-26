import { BigNumber, ethers } from "ethers";
import { abi as PositionRouter } from "./abis/PositionRouter.json";
import { abi as Vault } from "./abis/Vault.json";
import { Position } from "./types";
import { getTokenSymbol } from "./token-address-to-token-symbol";
import {
  docClient,
  dynamodbPositionsFromTableName,
  provider,
} from "./constants";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export async function indexDecreasePosition(
  transaction: ethers.providers.TransactionReceipt,
  prices: Map<string, number>
): Promise<void> {
  if (isDecreasePosition(transaction)) {
    console.log(`Handling decreasing position`);
    const contractInterface = new ethers.utils.Interface(PositionRouter);
    for (let i = 0; i < transaction.logs.length; i++) {
      try {
        const event = contractInterface.parseLog(transaction.logs[i]);
        if (event.name === "ExecuteDecreasePosition") {
          console.log(event);
          const token = getTokenSymbol(event.args.indexToken);
          const position: Position = {
            account: event.args.account.toLowerCase(),
            tradingToken: token,
            positionSizeInUsd:
              event.args.sizeDelta.div(BigNumber.from(10).pow(25)).toNumber() /
              100000.0,
            tradingTokenPrice: prices.get(token),
            isLong: event.args.isLong,
            timestampSeconds: await provider
              .getBlock(transaction.blockNumber)
              .then((block) => block.timestamp),
            type: "DECREASE",
            pnl: getPnl(transaction),
          };
          console.log(position);
          const command = new PutCommand({
            TableName: dynamodbPositionsFromTableName,
            Item: position,
          });
          await docClient.send(command);
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
      return event.name === "ExecuteDecreasePosition";
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
        if (event.name === "UpdatePnl") {
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
