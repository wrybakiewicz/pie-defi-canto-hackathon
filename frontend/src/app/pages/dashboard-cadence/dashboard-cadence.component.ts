import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import {
  BestWorstTrade,
  CadenceData,
  PnlChart,
} from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { DashboardCadenceExampleComponent } from '../dashboard-cadence-example/dashboard-cadence-example.component';
import { CommonModule } from '@angular/common';
import { Subscription, Observable, Subject, timer, mergeMap } from 'rxjs';
import { TradingData } from '../../models/trades.model';
import { ApiService } from '../../services/api.service';

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
export class DashboardCadenceComponent implements OnInit, AfterViewInit {
  // Show example for testing purposes
  private readonly showExample = true;

  private subscription: Subscription = new Subscription();

  data!: CadenceData;
  data$!: Observable<CadenceData>;
  tradingData!: TradingData;
  tradingData$!: Observable<TradingData>;

  private pnlData = new Subject<PnlChart>();
  pnlData$ = this.pnlData.asObservable();

  constructor(private mockData: MockDataService, api: ApiService) {
    this.data$ = mockData.data$;
    this.tradingData$ = api.tradingData$;
  }

  ngOnInit(): void {
    if (!this.showExample) {
      this.loadMockData();
    }
    this.subscription.add(
      this.tradingData$.subscribe((data) => {
        this.tradingData = data;
        this.data = this.convert(data);
        // this.loadMockData();
      })
    );
  }

  private loadMockData() {
    this.subscription.add(
      this.data$.subscribe((data) => {
        this.data = data;
        this.pnlData.next(data.pnlChart);
      })
    );
    this.mockData.getCadenceDashboardData();
  }

  ngAfterViewInit(): void {
    if (!this.showExample) {
      this.mockData.getCadenceDashboardData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private convert(data: TradingData): CadenceData {
    const avgTrade = this.calculateAvgTrade(data);
    const bwTrade = this.findBestAndWorstTradeValues(data);
    const wonTradesCount = this.countWonTrades(data);
    const lostTradesCount = this.countLostTrades(data);
    const pnlTotal = data.closedPositions.reduce((a, b) => a + b.pnl, 0);
    debugger;
    return {
      pnl: pnlTotal,
      avgTrade: avgTrade,
      bwTrade: bwTrade,
      totalVolume: data.totalVolume,
      wonTradesCount: wonTradesCount,
      lostTradesCount: lostTradesCount,
      openedTrades: data.openedPositions.length,
      closedTrades: data.closedPositions.length,
      pnlChart: {
        profit: [],
        loss: [],
        volume: [],
        labels: [],
      },
    };
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
}
