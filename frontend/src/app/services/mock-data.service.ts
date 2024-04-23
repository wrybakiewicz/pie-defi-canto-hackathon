import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { CadenceData } from '../models/cadence.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {

  private dataSource = new Subject<CadenceData>();
  data$ = this.dataSource.asObservable();

  constructor() {}

  getCadenceDashboardData(): void {
    const profits = this.getRandomIntArray(0, 5000, 14);
    const losses = this.getRandomIntArray(0, 3000, 14);
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
        profit: profits,
        loss: losses,
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
