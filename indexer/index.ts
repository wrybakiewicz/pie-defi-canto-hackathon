import {
  getNextBlockNumberToIndex,
  synchronizeBlocks,
} from "./indexing-service";

const run = async () => {
  console.log("Running indexer");
  let blockNumber = await getNextBlockNumberToIndex();
  //TODO: process in batch of 10k-100k blocks - but don't save - check if eligable for indexing - if yes (filter) - await on all and have in order and then save
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
