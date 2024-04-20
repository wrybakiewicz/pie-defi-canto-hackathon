const run = async () => {
  console.log("Running indexer");
  while (true) {
    const block = 8448050; // get from db / cadence deployment
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
