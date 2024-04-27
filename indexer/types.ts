export type Position = {
  account: string;
  tradingToken: string;
  positionSizeInUsd: number;
  tradingTokenPrice: number;
  isLong: boolean;
  timestampSeconds: number;
  type: string;
  pnl: number;
  transactionHash: string;
};

export type Price = {
  token: string;
  price: number;
  timestampSeconds: number;
};

export type AddressToPnl = {
  partition: string;
  address: string;
  pnl: number;
};
