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

  // console.log(positionEvents);

  let totalVolume = 0.0;
  const dailyVolume = new Map(); // day is a key, volume number is a value
  const openedPositions = new Map(); // type-token is a key, position is a value
  const closedPositions = [];
  for (let i = 0; i < positionEvents.length; i++) {
    const positionEvent = positionEvents[i];
    // console.log(positionEvent);
    const existingPosition = openedPositions.get(getPositionKey(positionEvent));
    if (positionEvent.type === "INCREASE") {
      if (existingPosition) {
        console.log("Increasing position that already exist");
        openedPositions.set(getPositionKey(positionEvent), {
          type: positionEvent.isLong ? "LONG" : "SHORT",
          token: positionEvent.tradingToken,
          positionSizeInUsd:
            positionEvent.positionSizeInUsd +
            existingPosition.positionSizeInUsd,
          openPrice: positionEvent.tradingTokenPrice,
          openTimestampSeconds: positionEvent.timestampSeconds,
          pnl: 0,
        });
      } else {
        console.log("Increasing position that does not exist");
        openedPositions.set(getPositionKey(positionEvent), {
          type: positionEvent.isLong ? "LONG" : "SHORT",
          token: positionEvent.tradingToken,
          positionSizeInUsd: positionEvent.positionSizeInUsd,
          openPrice: positionEvent.tradingTokenPrice,
          openTimestampSeconds: positionEvent.timestampSeconds,
          pnl: 0,
        });
      }
    } else {
      if (
        positionEvent.positionSizeInUsd === existingPosition.positionSizeInUsd
      ) {
        console.log("Closing entirely the position");
        closedPositions.push({
          type: existingPosition.isLong ? "LONG" : "SHORT",
          token: existingPosition.token,
          positionSizeInUsd: existingPosition.positionSizeInUsd,
          openPrice: existingPosition.openPrice,
          openTimestampSeconds: existingPosition.openTimestampSeconds,
          closePrice: positionEvent.tradingTokenPrice,
          closeTimestampSeconds: positionEvent.timestampSeconds,
          pnl: positionEvent.pnl + existingPosition.pnl,
        });
        openedPositions.delete(getPositionKey(positionEvent));
      } else {
        console.log("Closing partially the position");
        //TODO: in case position get decreased we should not include it in position size ?
        openedPositions.set(getPositionKey(positionEvent), {
          type: existingPosition.isLong ? "LONG" : "SHORT",
          token: existingPosition.token,
          positionSizeInUsd:
            existingPosition.positionSizeInUsd -
            positionEvent.positionSizeInUsd,
          openPrice: existingPosition.openPrice,
          openTimestampSeconds: existingPosition.openTimestampSeconds,
          closePrice: positionEvent.closePrice,
          closeTimestampSeconds: positionEvent.timestampSeconds,
          pnl: positionEvent.pnl,
        });
      }
    }
    const positionEventDate = new Date(positionEvent.timestampSeconds * 1000);
    const dayMonthYear = `${positionEventDate.getFullYear()}-${positionEventDate.getMonth()}-${positionEventDate.getDate()}`;
    dailyVolume.set(
      dayMonthYear,
      (dailyVolume.get(dayMonthYear) || 0) + positionEvent.positionSizeInUsd
    );
    totalVolume += positionEvent.positionSizeInUsd;
  }
  //TODO: list of trades: Type | Token | Size | Open price | Open date | Close price | Close date | PnL
  //TODO: live trades - calculate PnL by last price
  console.log(positionEvents);

  const dailyVolumeArray = Array.from(dailyVolume, ([key, value]) => {
    return { date: key, dailyVolume: value };
  });
  console.log(`Total volume: ${totalVolume}`);
  console.log(`Daily volume:`);
  console.log(dailyVolumeArray);
  console.log(`Closed positions:`);
  console.log(closedPositions);
  return {
    totalVolume: totalVolume,
    dailyVolumes: dailyVolumeArray,
    closedPositions: closedPositions,
  };
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
