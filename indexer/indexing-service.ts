import {
  defaultNextBlockToIndex,
  docClient,
  dynamodbLastSyncedBlockTableName,
  provider,
} from "./constants";

import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function getNextBlockToIndex(): Promise<number | undefined> {
  const currentBlockNumber = await provider.getBlockNumber();
  const lastSyncedBlockFromDb = await getLastSyncedBlockFromDb();
  if (lastSyncedBlockFromDb) {
    if (lastSyncedBlockFromDb < currentBlockNumber) {
      return lastSyncedBlockFromDb + 1;
    } else {
      return undefined;
    }
  } else {
    return defaultNextBlockToIndex;
  }
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
