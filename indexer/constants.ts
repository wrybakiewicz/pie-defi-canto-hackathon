import { ethers } from "ethers";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import "dotenv/config";

const RPC_URL = process.env.RPC_URL;

export const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

export const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "eu-west-2" }),
  {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  }
);

export const defaultNextBlockToIndex = Number(
  process.env.DEFAULT_NEXT_BLOCK_TO_INDEX
);

export const dynamodbLastSyncedBlockTableName =
  process.env.DYNAMODB_LAST_SYNCED_BLOCK_TABLE_NAME;

export const dynamodbPositionsFromTableName =
  process.env.DYNAMODB_POSITIONS_FROM_TABLE_NAME;

export const dynamodbPriceTableName = process.env.DYNAMODB_PRICE_TABLE_NAME;

export const dynamodbAllAddressesToPnlTableName =
  process.env.DYNAMODB_ALL_ADDRESSES_TO_PLN_TABLE_NAME;

export const blockBatchSize = Number(process.env.BLOCK_BATCH_SIZE);

export const positionRouterAddress =
  "0xab4dc3df37cdaaf9bb87938af6089543c1832512".toLowerCase();

export const vaultAddress =
  "0xbb975222f04c1992a39a27b19261646fd6547919".toLowerCase();
