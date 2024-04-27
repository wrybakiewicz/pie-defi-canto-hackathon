import { BigNumber, ethers } from "ethers";
import { abi as Vault } from "./abis/Vault.json";
import { Position } from "./types";
import { getTokenSymbol } from "./token-address-to-token-symbol";
import {
  docClient,
  dynamodbPositionsFromTableName,
  provider,
} from "./constants";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getAddressToPnl, saveAddressToPnl } from "./indexing-service";

export async function indexLiquidatePosition(
  transaction: ethers.providers.TransactionReceipt
): Promise<void> {
  if (isLiquidatePosition(transaction)) {
    console.log(`Handling liquidating position`);
    const contractInterface = new ethers.utils.Interface(Vault);
    for (let i = 0; i < transaction.logs.length; i++) {
      try {
        const event = contractInterface.parseLog(transaction.logs[i]);
        if (event.name === "LiquidatePosition") {
          try {
            const pnl =
              -1.0 *
              (event.args.collateral
                .div(BigNumber.from(10).pow(25))
                .toNumber() /
                100000.0);
            const address = event.args.account.toLowerCase();
            const addressToPnl = await getAddressToPnl(address);
            const position: Position = {
              account: address,
              tradingToken: getTokenSymbol(event.args.indexToken),
              positionSizeInUsd:
                event.args.size.div(BigNumber.from(10).pow(25)).toNumber() /
                100000.0,
              tradingTokenPrice:
                event.args.markPrice
                  .div(BigNumber.from(10).pow(25))
                  .toNumber() / 100000.0,
              isLong: event.args.isLong,
              timestampSeconds: await provider
                .getBlock(transaction.blockNumber)
                .then((block) => block.timestamp),
              type: "LIQUIDATE",
              pnl: pnl,
            };
            const command = new PutCommand({
              TableName: dynamodbPositionsFromTableName,
              Item: position,
            });
            await docClient.send(command);
            await saveAddressToPnl({
              partition: "ALL",
              address: address,
              pnl: addressToPnl.pnl + pnl,
            });
          } catch (e) {
            console.error("Error liquidating position:");
            console.error(e);
            console.error("Error liquidating event:");
            console.error(event);
          }
        }
      } catch (e) {}
    }
  }
}

export function isLiquidatePosition(
  transaction: ethers.providers.TransactionReceipt
): boolean {
  const contractInterface = new ethers.utils.Interface(Vault);
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
