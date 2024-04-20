import { blockBatchSize, provider } from "./constants";
import {
  getNextBlockNumberToIndex,
  synchronizeBlocks,
} from "./indexing-service";
import { createRange } from "./utils";

const run = async () => {
  console.log("Running indexer");
  while (true) {
    const currentBlockNumber = await provider.getBlockNumber();
    const nextBlockNumber = await getNextBlockNumberToIndex(currentBlockNumber);
    if (nextBlockNumber !== undefined) {
      const range = createRange(
        nextBlockNumber,
        Math.min(nextBlockNumber + blockBatchSize, currentBlockNumber)
      );
      console.log(
        `Syncing new blocks from ${range[0]} to ${range[range.length - 1]}`
      );
      await synchronizeBlocks(range);
    } else {
      console.log("No new block");
      await sleep(1000);
    }
  }
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

run();
