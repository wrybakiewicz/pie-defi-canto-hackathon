import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData, PnlDataPoint } from '../../models/cadence.model';

@Component({
  selector: 'app-dashboard-cadence',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-cadence.component.html',
  styleUrl: './dashboard-cadence.component.scss',
})
export class DashboardCadenceComponent implements OnInit {
  data!: CadenceData;

  ngOnInit(): void {
    const pnlData = new Map<Date, PnlDataPoint>();
    this.initPnlChartMockData(pnlData);
    this.data = {
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
        data: pnlData,
      },
    };
  }

  private initPnlChartMockData(pnlData: Map<Date, PnlDataPoint>) {
    pnlData.set(new Date('04.01.2024'), {
      profit: 2300,
      loss: 1200,
      volume: 3500,
    });
    pnlData.set(new Date('04.02.2024'), {
      profit: 1500,
      loss: 2500,
      volume: 5000,
    });
    pnlData.set(new Date('04.03.2024'), {
      profit: 4000,
      loss: 900,
      volume: 6000,
    });
    pnlData.set(new Date('04.04.2024'), {
      profit: 1200,
      loss: 800,
      volume: 2900,
    });
    pnlData.set(new Date('04.05.2024'), {
      profit: 2200,
      loss: 3200,
      volume: 5500,
    });
    pnlData.set(new Date('04.06.2024'), {
      profit: 1800,
      loss: 700,
      volume: 4200,
    });
    pnlData.set(new Date('04.07.2024'), {
      profit: 900,
      loss: 400,
      volume: 3100,
    });
    pnlData.set(new Date('04.08.2024'), {
      profit: 1000,
      loss: 1900,
      volume: 6200,
    });
    pnlData.set(new Date('04.09.2024'), {
      profit: 3000,
      loss: 500,
      volume: 7100,
    });
    pnlData.set(new Date('04.10.2024'), {
      profit: 1600,
      loss: 300,
      volume: 3400,
    });
    pnlData.set(new Date('04.11.2024'), {
      profit: 2000,
      loss: 3000,
      volume: 4500,
    });
    pnlData.set(new Date('04.12.2024'), {
      profit: 2500,
      loss: 600,
      volume: 3800,
    });
    pnlData.set(new Date('04.13.2024'), {
      profit: 1000,
      loss: 200,
      volume: 3000,
    });
    pnlData.set(new Date('04.14.2024'), {
      profit: 1700,
      loss: 2800,
      volume: 5900,
    });
  }
}
