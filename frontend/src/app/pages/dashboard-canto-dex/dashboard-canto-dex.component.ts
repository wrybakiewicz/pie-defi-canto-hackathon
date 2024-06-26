import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData, PnlChart } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { Observable, Subject, timer, mergeMap, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-canto-dex',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-canto-dex.component.html',
  styleUrl: './dashboard-canto-dex.component.scss',
})
export class DashboardCantoDexComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subscription: Subscription = new Subscription();

  data!: CadenceData;
  data$!: Observable<CadenceData>;
  private pnlData = new Subject<PnlChart>();
  pnlData$ = this.pnlData.asObservable();

  constructor(private mockData: MockDataService) {
    this.data$ = mockData.data$;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.data$.subscribe((data) => {
        this.data = data;
        this.pnlData.next(data.pnlChart);
      })
    );
  }

  ngAfterViewInit(): void {
    this.mockData.getCadenceDashboardData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
