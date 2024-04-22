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
  const address = event.queryStringParameters.address.toLowerCase();
  console.log(address);

  const getPositionsQuery = new QueryCommand({
    TableName:
      process.env.DYNAMODB_POSITIONS_FROM_TABLE_NAME ||
      "piedefi-positions-from-v2",
    KeyConditionExpression: "#key = :key",
    ExpressionAttributeNames: { "#key": "account" },
    ExpressionAttributeValues: { ":key": address },
  });
  const result = (await docClient.send(getPositionsQuery)).Items;
  console.log(result);
  return result;
}

// handler({
//   queryStringParameters: {
//     address: "0x1b58d50afd08dce062fb14d4e1f9665eb1eabeaf",
//   },
// });
