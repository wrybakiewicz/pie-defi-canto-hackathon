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
    profit: number[];
    loss: number[];
    volume: number[];
    labels: string[]; 
}