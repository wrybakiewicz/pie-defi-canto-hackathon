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
    pnlData.set(new Date('01.04.2024'), {
      profit: 2300,
      loss: 1200,
      volume: 350000,
    });
    pnlData.set(new Date('02.04.2024'), {
      profit: 1500,
      loss: 2500,
      volume: 500000,
    });
    pnlData.set(new Date('03.04.2024'), {
      profit: 4000,
      loss: 900,
      volume: 600000,
    });
    pnlData.set(new Date('04.04.2024'), {
      profit: 1200,
      loss: 800,
      volume: 290000,
    });
    pnlData.set(new Date('05.04.2024'), {
      profit: 2200,
      loss: 3200,
      volume: 550000,
    });
    pnlData.set(new Date('06.04.2024'), {
      profit: 1800,
      loss: 700,
      volume: 420000,
    });
    pnlData.set(new Date('07.04.2024'), {
      profit: 900,
      loss: 400,
      volume: 310000,
    });
    pnlData.set(new Date('08.04.2024'), {
      profit: 1000,
      loss: 1900,
      volume: 620000,
    });
    pnlData.set(new Date('09.04.2024'), {
      profit: 3000,
      loss: 500,
      volume: 710000,
    });
    pnlData.set(new Date('10.04.2024'), {
      profit: 1600,
      loss: 300,
      volume: 340000,
    });
    pnlData.set(new Date('11.04.2024'), {
      profit: 2000,
      loss: 3000,
      volume: 450000,
    });
    pnlData.set(new Date('12.04.2024'), {
      profit: 2500,
      loss: 600,
      volume: 380000,
    });
    pnlData.set(new Date('13.04.2024'), {
      profit: 1000,
      loss: 200,
      volume: 300000,
    });
    pnlData.set(new Date('14.04.2024'), {
      profit: 1700,
      loss: 2800,
      volume: 590000,
    });    
  }
}
