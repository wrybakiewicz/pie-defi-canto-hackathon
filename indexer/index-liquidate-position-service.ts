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

export async function indexLiquidatePosition(
  transaction: ethers.providers.TransactionReceipt
): Promise<void> {
  if (isLiquidatePosition(transaction)) {
    console.log(`Handling liquidating position`);
    const contractInterface = new ethers.utils.Interface(PositionRouter);
    for (let i = 0; i < transaction.logs.length; i++) {
      try {
        const event = contractInterface.parseLog(transaction.logs[i]);
        if (event.name === "LiquidatePosition") {
          console.log(event);
          const position: Position = {
            account: event.args.account.toLowerCase(),
            tradingToken: getTokenSymbol(event.args.indexToken),
            positionSizeInUsd:
              event.args.size.div(BigNumber.from(10).pow(25)).toNumber() /
              100000.0,
            tradingTokenPrice:
              event.args.markPrice.div(BigNumber.from(10).pow(25)).toNumber() /
              100000.0,
            isLong: event.args.isLong,
            timestampSeconds: await provider
              .getBlock(transaction.blockNumber)
              .then((block) => block.timestamp),
            type: "LIQUIDATE",
            pnl:
              -1.0 *
              (event.args.collateral
                .div(BigNumber.from(10).pow(25))
                .toNumber() /
                100000.0),
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

export function isLiquidatePosition(
  transaction: ethers.providers.TransactionReceipt
): boolean {
  const contractInterface = new ethers.utils.Interface(PositionRouter);
  const receiptCheckResult = transaction.logs.map((log) => {
    try {
      const event = contractInterface.parseLog(log);
      return event.name === "LiquidatePosition";
    } catch (e) {
      return false;
    }
  });
  return receiptCheckResult.some((result) => result);
}