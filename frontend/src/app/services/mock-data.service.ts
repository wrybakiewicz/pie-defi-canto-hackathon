import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { CadenceData } from '../models/cadence.model';
import { Position } from '../models/trades.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private dataSource = new Subject<CadenceData>();
  data$ = this.dataSource.asObservable();

  constructor() {}

  getCadenceRandomPositions(): { closed: Position[]; opened: Position[] } {
    return this.generatePositions(this.getRandomNumber(2, 8));
  }

  private getRandomToken(): string {
    const tokens = ['ETH', 'WCANTO'];
    return tokens[Math.floor(Math.random() * tokens.length)];
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private getRandomDate(start: Date, end: Date): string {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toISOString();
  }

  private createRandomPosition(): Position {
    const type: 'LONG' | 'SHORT' = Math.random() > 0.5 ? 'LONG' : 'SHORT';
    const token = this.getRandomToken();
    const positionSizeInUsd = this.getRandomNumber(1000, 10000);
    const openPrice = this.getRandomNumber(10, 1000);
    const openDate = this.getRandomDate(new Date(2020, 0, 1), new Date());
    let closePrice = undefined;
    let closeDate = undefined;
    let pnl = 0;
    let isLiquidated = false;

    if (Math.random() > 0.5) {
      closePrice = this.getRandomNumber(10, 1000);
      closeDate = this.getRandomDate(new Date(openDate), new Date());
      pnl =
        ((closePrice - openPrice) *
          (type === 'LONG' ? 1 : -1) *
          positionSizeInUsd) /
        openPrice;
        isLiquidated = pnl < 0 ? Math.random() < 0.2 : false;
    }


    return {
      type,
      token,
      positionSizeInUsd,
      openPrice,
      openDate,
      closePrice,
      closeDate,
      pnl,
      isLiquidated,
    };
  }

  private generatePositions(numPositions: number): {
    opened: Position[];
    closed: Position[];
  } {
    const positions: Position[] = Array.from({ length: numPositions }, () =>
      this.createRandomPosition()
    );
    return {
      opened: positions.filter((p) => p.closePrice === undefined),
      closed: positions.filter((p) => p.closePrice !== undefined),
    };
  }

  getCadenceDashboardData(): void {
    const pnl = this.getRandomIntArray(-500, 5000, 14);
    const volumes = this.getRandomIntArray(0, 15000, 14);
    const dates = [
      '01.04',
      '02.04',
      '03.04',
      '04.04',
      '05.04',
      '06.04',
      '07.04',
      '08.04',
      '09.04',
      '10.04',
      '11.04',
      '12.04',
      '13.04',
      '14.04',
    ];
    this.dataSource.next({
      pnl: this.getRandomInt(100, 55555),
      avgTrade: this.getRandomInt(100, 55555),
      bwTrade: {
        best: this.getRandomInt(100, 55555),
        worst: this.getRandomInt(100, 55555),
      },
      totalVolume: this.getRandomInt(100, 5555555),
      wonTradesCount: this.getRandomInt(10, 80),
      lostTradesCount: this.getRandomInt(1, 70),
      openedTrades: this.getRandomInt(1, 50),
      closedTrades: this.getRandomInt(1, 200),
      pnlChart: {
        pnl: pnl,
        volume: volumes,
        labels: dates,
      },
    });
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomIntArray(min: number, max: number, size: number): number[] {
    const randoms: number[] = [];
    for (let i = 0; i < size; i++) {
      randoms.push(this.getRandomInt(min, max));
    }
    return randoms;
  }
}
