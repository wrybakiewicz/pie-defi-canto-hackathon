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
  console.log(addresses);
}

handler({});
