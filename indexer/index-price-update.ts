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

export async function indexPriceUpdate(
  transaction: ethers.providers.TransactionReceipt
): Promise<Map<string, number>> {
  if (isPriceUpdated(transaction)) {
    console.log(`Handling price update`);
    const contractInterface = new ethers.utils.Interface(FastPriceEvents);
    const tokenToPriceMap = new Map();
    for (let i = 0; i < transaction.logs.length; i++) {
      try {
        const event = contractInterface.parseLog(transaction.logs[i]);
        if (event.name === "PriceUpdate") {
          console.log(event);
          const price: Price = {
            token: getTokenSymbol(event.args.token),
            timestampSeconds: await provider
              .getBlock(transaction.blockNumber)
              .then((block) => block.timestamp),
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
        }
      } catch (e) {}
    }
    return tokenToPriceMap;
  }
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
