import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import {
  BestWorstTrade,
  CadenceData,
  PnlChart,
} from '../../models/cadence.model';
import { DailyVolume, Position, TradingData } from '../../models/trades.model';
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
export class DashboardCadenceComponent implements OnInit, OnDestroy {
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
      .filter((a) => a.closePrice && a.pnl <= 0)
      .reduce((a) => a + 1, 0);
  }

  private countWonTrades(data: TradingData) {
    return data.closedPositions
    .filter((a) => a.closePrice && a.pnl > 0)
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
        if (best === null || position.pnl > best) {
          best = position.pnl;
        }
        if (worst === null || position.pnl < worst) {
          worst = position.pnl;
        }
      }
    });
    return { best, worst };
  }

  generatePnlChart(data: TradingData): PnlChart {
    const pnlValues = this.sortClosedPositionsByDate(data);
    const volumes = this.sortVolumesByDate(data);
    const accPnl: number[] = this.accumulatePnlByDay(pnlValues, volumes);

    return {
      labels: volumes.map((a) => (a.date ? a.date : 'x')),
      volume: volumes.map((a) => a.dailyVolume),
      pnl: accPnl,
    };
  }

  private accumulatePnlByDay(pnlValues: Position[], volumes: DailyVolume[]) {
    const accPnl: number[] = [];
    const pnlMap = new Map<string, number>();
    pnlValues.forEach((pnl) => {
      if (!pnl.closeDate) {
        return;
      }
      const dailyPnl = pnlMap.get(pnl.closeDate);
      if (!dailyPnl) {
        pnlMap.set(pnl.closeDate, pnl.pnl);
        return;
      }
      pnlMap.set(pnl.closeDate, dailyPnl + pnl.pnl);
    });
    for (let i = 0; i < volumes.length; i++) {
      const pnlOnDay = pnlMap.get(volumes[i].date);
      if (pnlOnDay) {
        if (accPnl.length > 0) {
          accPnl.push(pnlOnDay + accPnl[accPnl.length - 1]);
        } else {
          accPnl.push(pnlOnDay);
        }
      } else {
        if (accPnl.length > 0) {
          accPnl.push(accPnl[accPnl.length - 1]);
        } else {
          accPnl.push(0);
        }
      }
    }
    return accPnl;
  }

  private sortClosedPositionsByDate(data: TradingData): Position[] {
    return data.closedPositions.sort((a, b) => {
      const dateA = a.closeDate
        ? new Date(a.closeDate)
        : new Date(8640000000000000);
      const dateB = b.closeDate
        ? new Date(b.closeDate)
        : new Date(8640000000000000);

      return dateA.getTime() - dateB.getTime();
    });
  }

  private sortVolumesByDate(data: TradingData): DailyVolume[] {
    return data.dailyVolumes.sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(8640000000000000);
      const dateB = b.date ? new Date(b.date) : new Date(8640000000000000);

      return dateA.getTime() - dateB.getTime();
    });
  }
}
