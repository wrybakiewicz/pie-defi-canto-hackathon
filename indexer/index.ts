import {
  getNextBlockNumberToIndex,
  synchronizeBlocks,
} from "./indexing-service";

const run = async () => {
  console.log("Running indexer");
  let blockNumber = await getNextBlockNumberToIndex();
  while (true) {
    if (blockNumber !== undefined) {
      console.log(`New block ${blockNumber}`);
      await synchronizeBlocks([blockNumber]);
      blockNumber += 1;
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
