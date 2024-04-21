import { BigNumber, ethers } from "ethers";
import { abi as PositionRouter } from "./abis/PositionRouter.json";
import { Position } from "./types";
import { getTokenSymbol } from "./token-address-to-token-symbol";

export async function indexIncreasePosition(
  transaction: ethers.providers.TransactionReceipt
): Promise<void> {
  //TODO: handle also increasing existing position
  if (isIncreasePosition(transaction)) {
    console.log(`Handling increasing position`);
    const contractInterface = new ethers.utils.Interface(PositionRouter);
    for (let i = 0; i < transaction.logs.length; i++) {
      try {
        const event = contractInterface.parseLog(transaction.logs[i]);
        if (event.name === "ExecuteIncreasePosition") {
          console.log("Event Name:", event.name);
          console.log("Event Values:", event.args);
          console.log(event);
          try {
            const position: Position = {
              account: event.args.account,
              tradingToken: getTokenSymbol(event.args.indexToken),
              positionSizeInUsd:
                event.args.sizeDelta
                  .div(BigNumber.from(10).pow(28))
                  .toNumber() / 100.0,
              tradingTokenPrice:
                event.args.acceptablePrice
                  .div(BigNumber.from(10).pow(28))
                  .toNumber() / 100.0,
              isLong: event.args.isLong,
            };
            console.log(position);
          } catch (e) {
            console.error(e);
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
