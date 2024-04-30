export interface CadenceData {
  pnl: number;
  realizedPnl: number;
  unrealizedPnl: number;
  avgTrade: number;
  bwTrade: BestWorstTrade;
  totalVolume: number;
  wonTradesCount: number;
  lostTradesCount: number;
  openedTrades: number;
  closedTrades: number;
  pnlChart: PnlChart;
}

export interface BestWorstTrade {
  best: number;
  worst: number;
}

export interface PnlChart {
  pnl: number[];
  volume: number[];
  labels: string[];
}
