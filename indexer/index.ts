import { getNextBlockToIndex } from "./indexing-service";

const run = async () => {
  console.log("Running indexer");
  while (true) {
    const block = await getNextBlockToIndex();
    if (block) {
      console.log(`New block ${block}`);
      //synchronize block
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
