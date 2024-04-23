import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData, PnlChart } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { Observable, Subject, Subscription, mergeMap, timer } from 'rxjs';

@Component({
  selector: 'app-dashboard-cadence-example',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-cadence-example.component.html',
  styleUrl: './dashboard-cadence-example.component.scss',
})
export class DashboardCadenceExampleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private timer!: Subscription;

  data!: CadenceData;
  data$!: Observable<CadenceData>;
  private pnlData = new Subject<PnlChart>();
  pnlData$ = this.pnlData.asObservable();

  constructor(private mockData: MockDataService) {
    this.data$ = mockData.data$;
  }
  
  ngOnInit(): void {
    this.subscription.add(this.data$.subscribe((data) => {
      this.data = data;
      this.pnlData.next(data.pnlChart)
    }));
    this.mockData.getCadenceDashboardData()
    this.timer = timer(0, 5000)
    .pipe(mergeMap(async (_) => this.mockData.getCadenceDashboardData()))
    .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.timer?.unsubscribe();
  }

}
