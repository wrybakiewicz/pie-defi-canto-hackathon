import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData } from '../../models/cadence.model';

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
    };
  }
}
