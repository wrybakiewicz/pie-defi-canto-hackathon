export type Position = {
  account: string;
  tradingToken: string;
  positionSizeInUsd: number;
  tradingTokenPrice: number;
  isLong: boolean;
  timestampSeconds: number;
  type: string;
  pnl: number;
};
