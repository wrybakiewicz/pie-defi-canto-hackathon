import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-west-2" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export async function handler(event, context) {
  const allAddressesQuery = new QueryCommand({
    TableName: "piedefi-all-addresses-to-pnl-v5",
    KeyConditionExpression: "#key = :key",
    ExpressionAttributeNames: { "#key": "partition" },
    ExpressionAttributeValues: { ":key": "ALL" },
  });
  const allAddresses = (await docClient.send(allAddressesQuery)).Items;
  const addresses = allAddresses.map((addr) => addr.address);
  console.log(addresses.length);
  for (let i = 0; i < addresses.length; i++) {
    const pnl = await fetchPnlForAddress(addresses[i]);
    await saveAddressToPnl(addresses[i], pnl);
  }
}

async function fetchPnlForAddress(address) {
  const stats = await fetch(`https://v5.piedefi.com?address=${address}`).then(
    (res) => res.json()
  );
  console.log(stats);
  let pnl = 0;
  for (let i = 0; i < stats.closedPositions.length; i++) {
    pnl += stats.closedPositions[i].pnl;
  }
  for (let j = 0; j < stats.openedPositions.length; j++) {
    pnl += stats.openedPositions[j].pnl;
  }
  return pnl;
}

async function saveAddressToPnl(address, pnl) {
  const command = new PutCommand({
    TableName: "piedefi-all-addresses-to-pnls-v5",
    Item: {
      partition: "ALL",
      address: address,
      pnl: pnl,
    },
  });
  await docClient.send(command);
}

handler({});
