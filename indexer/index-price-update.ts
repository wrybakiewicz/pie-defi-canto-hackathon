import { BigNumber, ethers } from "ethers";
import { abi as PositionRouter } from "./abis/PositionRouter.json";
import { abi as FastPriceEvents } from "./abis/FastPriceEvents.json";
import { Position, Price } from "./types";
import { getTokenSymbol } from "./token-address-to-token-symbol";
import {
  docClient,
  dynamodbPositionsFromTableName,
  dynamodbPriceTableName,
  provider,
} from "./constants";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Block } from "typescript";

export async function indexPriceUpdate(result: {
  receipt: ethers.providers.TransactionReceipt;
  block: ethers.providers.Block;
}): Promise<Map<string, number>> {
  const tokenToPriceMap = new Map();
  if (isPriceUpdated(result.receipt)) {
    console.log(`Handling price update`);
    const contractInterface = new ethers.utils.Interface(FastPriceEvents);
    for (let i = 0; i < result.receipt.logs.length; i++) {
      try {
        const event = contractInterface.parseLog(result.receipt.logs[i]);
        if (event.name === "PriceUpdate") {
          try {
            const price: Price = {
              token: getTokenSymbol(event.args.token),
              timestampSeconds: result.block.timestamp,
              price:
                event.args.price.div(BigNumber.from(10).pow(25)).toNumber() /
                100000.0,
            };
            const command = new PutCommand({
              TableName: dynamodbPriceTableName,
              Item: price,
            });
            await docClient.send(command);
            tokenToPriceMap.set(price.token, price.price);
          } catch (e) {
            console.error("Error updating prices:");
            console.error(e);
            console.error("Error updating prices event:");
            console.error(event);
          }
        }
      } catch (e) {}
    }
  }
  return tokenToPriceMap;
}

export function isPriceUpdated(
  transaction: ethers.providers.TransactionReceipt
): boolean {
  const contractInterface = new ethers.utils.Interface(FastPriceEvents);
  const receiptCheckResult = transaction.logs.map((log) => {
    try {
      const event = contractInterface.parseLog(log);
      return event.name === "PriceUpdate";
    } catch (e) {
      return false;
    }
  });
  return receiptCheckResult.some((result) => result);
}
