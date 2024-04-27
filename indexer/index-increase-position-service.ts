import { BigNumber, ethers } from "ethers";
import { abi as PositionRouter } from "./abis/PositionRouter.json";
import { Position } from "./types";
import { getTokenSymbol } from "./token-address-to-token-symbol";
import {
  docClient,
  dynamodbPositionsFromTableName,
  provider,
} from "./constants";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export async function indexIncreasePosition(
  transaction: ethers.providers.TransactionReceipt,
  prices: Map<string, number>
): Promise<void> {
  if (isIncreasePosition(transaction)) {
    console.log(`Handling increasing position`);
    const contractInterface = new ethers.utils.Interface(PositionRouter);
    for (let i = 0; i < transaction.logs.length; i++) {
      try {
        const event = contractInterface.parseLog(transaction.logs[i]);
        if (event.name === "ExecuteIncreasePosition") {
          try {
            const token = getTokenSymbol(event.args.indexToken);
            const position: Position = {
              account: event.args.account.toLowerCase(),
              tradingToken: token,
              positionSizeInUsd:
                event.args.sizeDelta
                  .div(BigNumber.from(10).pow(25))
                  .toNumber() / 100000.0,
              tradingTokenPrice: prices.get(token),
              isLong: event.args.isLong,
              timestampSeconds: await provider
                .getBlock(transaction.blockNumber)
                .then((block) => block.timestamp),
              type: "INCREASE",
              pnl: 0,
            };
            const command = new PutCommand({
              TableName: dynamodbPositionsFromTableName,
              Item: position,
            });
            await docClient.send(command);
          } catch (e) {
            console.error("Error increasing position:");
            console.error(e);
            console.error("Error increasing event:");
            console.error(event);
          }
        }
      } catch (e) {}
    }
  }
}

export function isIncreasePosition(
  transaction: ethers.providers.TransactionReceipt
): boolean {
  const contractInterface = new ethers.utils.Interface(PositionRouter);
  const receiptCheckResult = transaction.logs.map((log) => {
    try {
      const event = contractInterface.parseLog(log);
      return event.name === "ExecuteIncreasePosition";
    } catch (e) {
      return false;
    }
  });
  return receiptCheckResult.some((result) => result);
}
