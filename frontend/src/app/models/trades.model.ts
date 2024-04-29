export interface TradingData {
  address: string;
  totalVolume: number;
  dailyVolumes: DailyVolume[];
  closedPositions: Position[];
  openedPositions: Position[];
}

export interface DailyVolume {
  date: string;
  dailyVolume: number;
}

export interface Position {
  type: 'LONG' | 'SHORT';
  token: string;
  positionSizeInUsd: number;
  openPrice: number;
  openDate: string;
  closePrice?: number;
  closeDate?: string;
  pnl: number;
  isLiquidated: boolean;
}
