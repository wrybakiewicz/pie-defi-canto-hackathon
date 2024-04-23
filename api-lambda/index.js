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
  const positionEvents = (await docClient.send(getPositionsQuery)).Items;

  let totalVolume = 0.0;
  const dailyVolume = new Map(); // day is a key, volume number is a value
  const openedPositions = Map(); // type-token is a key, position is a value
  const closedPosition = [];
  for (let i = 0; i < positionEvents.length; i++) {
    const positionEvent = positionEvents[i];
    console.log(positionEvent);
    const existingPosition = openedPositions.get(getPositionKey(positionEvent));
    if (positionEvent === "INCREASE") {
      if (existingPosition) {
        console.log("Increasing position that already exist");
        openedPositions.set(getPositionKey(positionEvent), {
          type: positionEvent.isLong ? "LONG" : "SHORT",
          token: positionEvent.tradingToken,
          positionSizeInUsd: positionEvent.positionSizeInUsd,
          openPrice: positionEvent.tradingTokenPrice,
          openTimestampSeconds: positionEvent.timestampSeconds,
        });
      } else {
        console.log("Increasing position that does not exist");
        openedPositions.set(getPositionKey(positionEvent), {
          type: positionEvent.isLong ? "LONG" : "SHORT",
          token: positionEvent.tradingToken,
          positionSizeInUsd:
            positionEvent.positionSizeInUsd +
            existingPosition.positionSizeInUsd,
          openPrice: positionEvent.tradingTokenPrice,
          openTimestampSeconds: positionEvent.timestampSeconds,
        });
      }
    } else {
      if (
        positionEvent.positionSizeInUsd === existingPosition.positionSizeInUsd
      ) {
        console.log("Closing entirely the position");
        closedPosition.push({
          type: existingPosition.isLong ? "LONG" : "SHORT",
          token: existingPosition.tradingToken,
          positionSizeInUsd: existingPosition.positionSizeInUsd,
          openPrice: existingPosition.tradingTokenPrice,
          openTimestampSeconds: existingPosition.timestampSeconds,
          closePrice: positionEvent.tradingTokenPrice,
          closeTimestampSeconds: positionEvent.timestampSeconds,
          pnl: positionEvent.pnl,
        });
        openedPositions.delete(getPositionKey(positionEvent));
      } else {
        console.log("Closing partially the position");
        //TODO: in case position get decreased we should not include it in position size ?
      }
    }
    const positionEventDate = new Date(positionEvent.timestampSeconds * 1000);
    const dayMonthYear = `${positionEventDate.getFullYear()}-${positionEventDate.getMonth()}-${positionEventDate.getDate()}`;
    dailyVolume.set(
      dayMonthYear,
      dailyVolume.get(dayMonthYear) + positionEvent.positionSizeInUsd
    );
    totalVolume += positionEvent.positionSizeInUsd;
  }
  //TODO: list of trades: Type | Token | Size | Open price | Open date | Close price | Close date | PnL
  //TODO: live trades - calculate PnL by last price
  console.log(positionEvents);
  return positionEvents;
}

function getPositionKey(positionEvent) {
  const type = positionEvent.isLong ? "LONG" : "SHORT";
  return `${type}-${positionEvent.tradingToken}`;
}

handler({
  queryStringParameters: {
    address: "0x861532bb628e3e9896bd2e43b99693508a98e921",
  },
});
