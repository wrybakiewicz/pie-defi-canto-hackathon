export interface CadenceData {
    pnl: number;
    avgTrade: number;
    bwTrade: BestWorstTrade;
    totalVolume: number;
    wonTradesCount: number;
    lostTradesCount: number;
    openedTrades: number;
    closedTrades:number;
}

export interface BestWorstTrade {
    best: number;
    worst: number;
}