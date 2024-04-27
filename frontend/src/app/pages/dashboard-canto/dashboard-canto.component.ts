import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ComponentsModule } from '../../components/components.module';
import { MockDataService } from '../../services/mock-data.service';
import { CadenceData, PnlChart } from '../../models/cadence.model';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-canto',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-canto.component.html',
  styleUrl: './dashboard-canto.component.scss',
})
export class DashboardCantoComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subscription: Subscription = new Subscription();

  data!: CadenceData;
  data$!: Observable<CadenceData>;
  private pnlData = new Subject<PnlChart>();
  pnlData$ = this.pnlData.asObservable();

  constructor(private mockData: MockDataService) {
    this.data$ = this.mockData.data$;
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
