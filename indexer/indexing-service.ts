import {
  defaultNextBlockToIndex,
  docClient,
  dynamodbLastSyncedBlockTableName,
  provider,
} from "./constants";

import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export async function getNextBlockNumberToIndex(): Promise<number | undefined> {
  const currentBlockNumberPromise = provider.getBlockNumber();
  const lastSyncedBlockFromDbPromise = getLastSyncedBlockFromDb();
  const currentBlockNumber = await currentBlockNumberPromise;
  const lastSyncedBlockFromDb = await lastSyncedBlockFromDbPromise;
  if (lastSyncedBlockFromDb !== undefined) {
    if (lastSyncedBlockFromDb < currentBlockNumber) {
      return lastSyncedBlockFromDb + 1;
    } else {
      return undefined;
    }
  } else {
    console.log(defaultNextBlockToIndex);
    return defaultNextBlockToIndex;
  }
}

export async function synchronizeBlock(blockNumber: number): Promise<void> {
  const block = await provider.getBlock(blockNumber);
  //TODO: do actual sync
  setBlockSynced(blockNumber).then((x) => console.log("SYNCED"));
}

async function getLastSyncedBlockFromDb(): Promise<number | undefined> {
  const query = new QueryCommand({
    TableName: dynamodbLastSyncedBlockTableName,
    KeyConditionExpression: "#key = :key",
    ExpressionAttributeNames: { "#key": "partition" },
    ExpressionAttributeValues: { ":key": "ALL" },
    Limit: 1,
    ScanIndexForward: false,
  });
  const result = (await docClient.send(query)).Items;
  if (result.length > 0) {
    return result[0].blockNumber;
  }
}

async function setBlockSynced(blockNumber: number): Promise<void> {
  const command = new PutCommand({
    TableName: dynamodbLastSyncedBlockTableName,
    Item: { blockNumber: blockNumber, partition: "ALL" },
  });
  await docClient.send(command);
}
