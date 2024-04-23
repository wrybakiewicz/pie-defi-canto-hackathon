import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CadenceData } from '../models/cadence.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  getCadenceDashboardData(): Observable<CadenceData> {
    const profits = [
      2300, 1500, 4000, 1200, 2200, 1800, 900, 1000, 3000, 1600, 2000, 2500,
      1000, 1700,
    ];
    const losses = [
      1200, 2500, 900, 800, 3200, 700, 400, 1900, 500, 300, 3000, 600, 200,
      2800,
    ];
    const volumes = [
      3500, 5000, 6000, 2900, 5500, 4200, 3100, 6200, 7100, 3400, 4500, 3800,
      3000, 5900,
    ];
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
    return of({
      pnl: 39218,
      avgTrade: 2038,
      bwTrade: {
        best: 93829,
        worst: 63299,
      },
      totalVolume: 9872340,
      wonTradesCount: 70,
      lostTradesCount: 30,
      openedTrades: 18,
      closedTrades: 22,
      pnlChart: {
        profit: profits,
        loss: losses,
        volume: volumes,
        labels: dates,
      },
    });
  }
}
