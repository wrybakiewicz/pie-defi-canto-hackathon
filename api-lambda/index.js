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

let allLatestTokenPrices;

export async function handler(event, context) {
  console.log(event);
  if (event.rawPath.endsWith("pnl")) {
    const getPnls = new QueryCommand({
      TableName: "piedefi-all-addresses-to-pnls-v5",
      KeyConditionExpression: "#key = :key",
      ExpressionAttributeNames: { "#key": "partition" },
      ExpressionAttributeValues: { ":key": "ALL" },
    });
    const pnls = (await docClient.send(getPnls)).Items;
    const sortedPnls = pnls.map((pnl) => {
      return {
        address: pnl.address,
        pnl: pnl.pnl,
      };
    });

    sortedPnls.sort((pnl1, pnl2) => pnl2.pnl - pnl1.pnl);
    return sortedPnls;
  }
  const address = event.queryStringParameters.address.toLowerCase();
  console.log(address);

  const getPositionsQuery = new QueryCommand({
    TableName: "piedefi-positions-from-v5",
    KeyConditionExpression: "#key = :key",
    ExpressionAttributeNames: { "#key": "account" },
    ExpressionAttributeValues: { ":key": address },
  });
  const allLatestTokenPricesPromise = getAllLatestTokenPrices();
  const positionEventsPromise = docClient.send(getPositionsQuery);

  const allLatestTokenPrices = await allLatestTokenPricesPromise;
  const positionEvents = (await positionEventsPromise).Items;

  const { totalVolume, dailyVolume, openedPositions, closedPositions } =
    calculateStats(positionEvents);
  // console.log(positionEvents);

  const dailyVolumeArray = Array.from(dailyVolume, ([key, value]) => {
    return { date: key, dailyVolume: value };
  });

  const openedPositionsArray = Array.from(openedPositions, ([_, position]) => {
    return {
      type: position.type,
      token: position.token,
      positionSizeInUsd: position.positionSizeInUsd,
      openPrice: position.openPrice,
      openDate: position.openDate,
      pnl:
        position.pnl +
        getPositionTokenVolume(position) *
          (allLatestTokenPrices.get(position.token).price - position.openPrice),
      isLiquidated: position.isLiquidated,
    };
  });

  // console.log(`Total volume: ${totalVolume}`);
  // console.log(`Daily volume:`);
  // console.log(dailyVolumeArray);
  // console.log(`Closed positions:`);
  // console.log(closedPositions);
  // console.log(`Opened positions:`);
  // console.log(openedPositionsArray);
  return {
    totalVolume: totalVolume,
    dailyVolumes: dailyVolumeArray,
    closedPositions: closedPositions,
    openedPositions: openedPositionsArray,
  };
}

export function calculateStats(positionEvents) {
  let totalVolume = 0.0;
  const dailyVolume = new Map(); // day is a key, volume number is a value
  const openedPositions = new Map(); // type-token is a key, position is a value
  const closedPositions = [];
  for (let i = 0; i < positionEvents.length; i++) {
    const positionEvent = positionEvents[i];
    const positionEventDate = new Date(positionEvent.timestampSeconds * 1000);
    const dayMonthYear = `${positionEventDate.getFullYear()}-${(
      "0" +
      (positionEventDate.getMonth() + 1)
    ).slice(-2)}-${positionEventDate.getDate()}`;
    const existingPosition = openedPositions.get(positionEvent.tradingToken);
    if (positionEvent.type === "INCREASE") {
      if (existingPosition) {
        // increase with the same direction as existing position
        if ((existingPosition.type === "LONG") === positionEvent.isLong) {
          console.log("Increasing position that already exist");
          console.log(
            `v1: ${
              positionEvent.positionSizeInUsd +
              existingPosition.positionSizeInUsd
            }`
          );
          openedPositions.set(positionEvent.tradingToken, {
            type: positionEvent.isLong ? "LONG" : "SHORT",
            token: positionEvent.tradingToken,
            positionSizeInUsd:
              positionEvent.positionSizeInUsd +
              existingPosition.positionSizeInUsd,
            openPrice: positionEvent.tradingTokenPrice,
            openDate: dayMonthYear,
            pnl: positionEvent.pnl + existingPosition.pnl,
            isLiquidated: false,
          });
        } else {
          // decreasing existing position (or even changing direction)
          const positionSizeInUsd =
            existingPosition.positionSizeInUsd -
            positionEvent.positionSizeInUsd;
          const isPositionDirectionChanged = positionSizeInUsd < 0;
          if (isPositionDirectionChanged) {
            console.log(`v2: ${existingPosition.positionSizeInUsd}`);
            console.log(`v3: ${-1.0 * positionSizeInUsd}`);
            closedPositions.push({
              type: existingPosition.isLong ? "LONG" : "SHORT",
              token: existingPosition.token,
              positionSizeInUsd: existingPosition.positionSizeInUsd,
              openPrice: existingPosition.openPrice,
              openDate: existingPosition.openDate,
              closePrice: positionEvent.tradingTokenPrice,
              closeDate: dayMonthYear,
              pnl: positionEvent.pnl + existingPosition.pnl,
              isLiquidated: false,
            });
            openedPositions.set(positionEvent.tradingToken, {
              type: positionEvent.isLong ? "LONG" : "SHORT",
              token: positionEvent.tradingToken,
              positionSizeInUsd: -1.0 * positionSizeInUsd,
              openPrice: positionEvent.tradingTokenPrice,
              openDate: dayMonthYear,
              pnl: 0,
              isLiquidated: false,
            });
          } else {
            console.log(
              `v4: ${
                existingPosition.positionSizeInUsd -
                positionEvent.positionSizeInUsd
              }`
            );
            openedPositions.set(positionEvent.tradingToken, {
              type: positionEvent.isLong ? "LONG" : "SHORT",
              token: positionEvent.tradingToken,
              positionSizeInUsd:
                existingPosition.positionSizeInUsd -
                positionEvent.positionSizeInUsd,
              openPrice: existingPosition.openPrice,
              openDate: existingPosition.openDate,
              pnl: existingPosition.pnl + positionEvent.pnl,
              isLiquidated: false,
            });
          }
        }
      } else {
        console.log("Increasing position that does not exist");
        console.log(`v5: ${positionEvent.positionSizeInUsd}`);
        openedPositions.set(positionEvent.tradingToken, {
          type: positionEvent.isLong ? "LONG" : "SHORT",
          token: positionEvent.tradingToken,
          positionSizeInUsd: positionEvent.positionSizeInUsd,
          openPrice: positionEvent.tradingTokenPrice,
          openDate: dayMonthYear,
          pnl: positionEvent.pnl,
          isLiquidated: false,
        });
      }
    } else if (positionEvent.type === "DECREASE") {
      if (!existingPosition) {
        console.error("There is no position to close");
        openedPositions.delete(positionEvent.tradingToken);
      } else if (
        positionEvent.positionSizeInUsd >= existingPosition.positionSizeInUsd
      ) {
        console.log("Closing entirely the position");
        console.log(`v6: ${existingPosition.positionSizeInUsd}`);
        closedPositions.push({
          type: existingPosition.isLong ? "LONG" : "SHORT",
          token: existingPosition.token,
          positionSizeInUsd: existingPosition.positionSizeInUsd,
          openPrice: existingPosition.openPrice,
          openDate: existingPosition.openDate,
          closePrice: positionEvent.tradingTokenPrice,
          closeDate: dayMonthYear,
          pnl: positionEvent.pnl + existingPosition.pnl,
          isLiquidated: false,
        });
        openedPositions.delete(positionEvent.tradingToken);
      } else {
        console.log(
          `v7: ${
            existingPosition.positionSizeInUsd - positionEvent.positionSizeInUsd
          }`
        );
        console.log("Closing partially the position");
        openedPositions.set(positionEvent.tradingToken, {
          type: existingPosition.isLong ? "LONG" : "SHORT",
          token: existingPosition.token,
          positionSizeInUsd:
            existingPosition.positionSizeInUsd -
            positionEvent.positionSizeInUsd,
          openPrice: existingPosition.openPrice,
          openDate: existingPosition.openDate,
          closePrice: positionEvent.closePrice,
          closeDate: dayMonthYear,
          pnl: existingPosition.pnl + positionEvent.pnl,
          isLiquidated: false,
        });
      }
    } else {
      if (!existingPosition) {
        console.log("There is no position to liquidate");
        openedPositions.delete(positionEvent.tradingToken);
      } else {
        console.log(`v8: ${existingPosition.positionSizeInUsd}`);
        console.log("Liquidating position");
        closedPositions.push({
          type: existingPosition.isLong ? "LONG" : "SHORT",
          token: existingPosition.token,
          positionSizeInUsd: existingPosition.positionSizeInUsd,
          openPrice: existingPosition.openPrice,
          openDate: existingPosition.openDate,
          closePrice: positionEvent.tradingTokenPrice,
          closeDate: dayMonthYear,
          pnl: positionEvent.pnl + existingPosition.pnl,
          isLiquidated: true,
        });
        openedPositions.delete(positionEvent.tradingToken);
      }
    }
    dailyVolume.set(
      dayMonthYear,
      (dailyVolume.get(dayMonthYear) || 0) + positionEvent.positionSizeInUsd
    );
    totalVolume += positionEvent.positionSizeInUsd;
  }
  return {
    totalVolume: totalVolume,
    dailyVolume: dailyVolume,
    openedPositions: openedPositions,
    closedPositions: closedPositions,
  };
}

function getPositionTokenVolume(position) {
  return position.positionSizeInUsd / position.openPrice;
}

async function getAllLatestTokenPrices() {
  if (allLatestTokenPrices) {
    return allLatestTokenPrices;
  } else {
    const tokens = ["WCANTO", "ETH", "ATOM"];
    const result = await Promise.all(
      tokens.map(async (token) => {
        const getLatestPrice = new QueryCommand({
          TableName: "piedefi-price-v5",
          KeyConditionExpression: "#key = :key",
          ExpressionAttributeNames: { "#key": "token" },
          ExpressionAttributeValues: { ":key": token },
          ScanIndexForward: false,
          Limit: 1,
        });
        return (await docClient.send(getLatestPrice)).Items[0];
      })
    );
    const resultMap = new Map(
      result.map((element) => [element.token, element])
    );
    allLatestTokenPrices = resultMap;
    return allLatestTokenPrices;
  }
}

//me
// handler({
//   queryStringParameters: {
//     address: "0x861532bb628e3e9896bd2e43b99693508a98e921",
//   },
// });

//early address - works
// handler({
//   queryStringParameters: {
//     address: "0x0cba2895a36d248b5025d083e6c5093f57a93ff7",
//   },
// });

// handler({
//   rawPath: "",
//   queryStringParameters: {
//     address: "0x8e07ab8fc9e5f2613b17a5e5069673d522d0207a",
//   },
// });

// handler({
//   rawPath: "",
//   queryStringParameters: {
//     address: "0x1beceb3cb1ac11a3391cd8d92e79c373a5b54891",
//   },
// });

// handler({
//   rawPath: "pnl",
// });
