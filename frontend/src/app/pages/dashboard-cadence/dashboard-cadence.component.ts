import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import {
  BestWorstTrade,
  CadenceData,
  PnlChart,
} from '../../models/cadence.model';
import { Position, TradingData } from '../../models/trades.model';
import { ApiService } from '../../services/api.service';
import { MockDataService } from '../../services/mock-data.service';
import { DashboardCadenceExampleComponent } from '../dashboard-cadence-example/dashboard-cadence-example.component';

@Component({
  selector: 'app-dashboard-cadence',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ComponentsModule,
    DashboardCadenceExampleComponent,
  ],
  templateUrl: './dashboard-cadence.component.html',
  styleUrl: './dashboard-cadence.component.scss',
})
export class DashboardCadenceComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  data!: CadenceData;
  private dataSource = new Subject<CadenceData>();
  data$ = this.dataSource.asObservable();

  tradingData!: TradingData;
  tradingData$!: Observable<TradingData>;

  private pnlData = new Subject<PnlChart>();
  pnlData$ = this.pnlData.asObservable();

  constructor(private mockData: MockDataService, api: ApiService) {
    this.tradingData$ = api.tradingData$;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.tradingData$.subscribe((data) => {
        this.tradingData = data;
        this.data = this.convert(data);
        this.dataSource.next(this.data);
        this.pnlData.next(this.data.pnlChart);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private convert(data: TradingData): CadenceData {
    return {
      pnl: this.calculateTotalPnl(data),
      avgTrade: this.calculateAvgTrade(data),
      bwTrade: this.findBestAndWorstTradeValues(data),
      totalVolume: data.totalVolume,
      wonTradesCount: this.countWonTrades(data),
      lostTradesCount: this.countLostTrades(data),
      openedTrades: data.openedPositions.length,
      closedTrades: data.closedPositions.length,
      pnlChart: this.generatePnlChart(data),
    };
  }

  private calculateTotalPnl(data: TradingData) {
    return data.closedPositions.reduce((a, b) => a + b.pnl, 0);
  }

  private countLostTrades(data: TradingData) {
    return data.closedPositions
      .filter((a) => a.closePrice && a.openPrice <= a.closePrice)
      .reduce((a) => a + 1, 0);
  }

  private countWonTrades(data: TradingData) {
    return data.closedPositions
      .filter((a) => a.closePrice && a.openPrice > a.closePrice)
      .reduce((a) => a + 1, 0);
  }

  private calculateAvgTrade(data: TradingData) {
    return (
      data.closedPositions.reduce((a, b) => a + b.positionSizeInUsd, 0) /
        data.closedPositions.length +
      data.openedPositions.reduce((a, b) => a + b.positionSizeInUsd, 0) /
        data.openedPositions.length
    );
  }

  private findBestAndWorstTradeValues(data: TradingData): BestWorstTrade {
    let best: number = 0;
    let worst: number = 0;
    data.closedPositions.forEach((position) => {
      if (position.closePrice !== undefined) {
        const pnl = position.closePrice - position.openPrice;

        if (best === null || pnl > best) {
          best = pnl;
        }
        if (worst === null || pnl < worst) {
          worst = pnl;
        }
      }
    });
    return { best, worst };
  }

  generatePnlChart(data: TradingData): PnlChart {
    const positions = this.sortClosedPositionsByDate(data);

  return {
    labels: positions.map((a) => a.closeDate? a.closeDate : 'x'),
    profit: positions.map((a) => a.positionSizeInUsd),
    loss: [],
    volume: positions.map((a) => a.pnl),
  }

  }
  private sortClosedPositionsByDate(data: TradingData): Position[] {
    return data.closedPositions.sort((a, b) => {
        const dateA = a.closeDate ? new Date(a.closeDate) : new Date(8640000000000000);
        const dateB = b.closeDate ? new Date(b.closeDate) : new Date(8640000000000000);

        return dateA.getTime() - dateB.getTime();
    });
}
}
