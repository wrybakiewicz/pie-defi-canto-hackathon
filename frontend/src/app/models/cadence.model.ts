export interface CadenceData {
    pnl: number;
    avgTrade: number;
    bwTrade: BestWorstTrade;
    totalVolume: number;
    wonTradesCount: number;
    lostTradesCount: number;
    openedTrades: number;
    closedTrades:number;
    pnlChart: PnlChart;
}

export interface BestWorstTrade {
    best: number;
    worst: number;
}

export interface PnlChart {
    data: Map<Date, PnlDataPoint>
}

export interface PnlDataPoint {
    profit: number;
    loss: number;
    volume: number;
}