import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData, PnlChart } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { Observable, Subject, Subscription, mergeMap, timer } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-cadence-example',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule, CommonModule],
  templateUrl: './dashboard-cadence-example.component.html',
  styleUrl: './dashboard-cadence-example.component.scss',
})
export class DashboardCadenceExampleComponent implements OnInit, OnDestroy {
  private readonly dataChangeTimeMs = 5000;

  private subscription: Subscription = new Subscription();
  private timer!: Subscription;
  private progressTimer!: Subscription;

  data!: CadenceData;
  data$!: Observable<CadenceData>;
  private pnlData = new Subject<PnlChart>();
  pnlData$ = this.pnlData.asObservable();
  barProgress = 0;

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
    this.mockData.getCadenceDashboardData();
    this.timer = timer(0, this.dataChangeTimeMs)
      .pipe(mergeMap(async (_) => {
        this.mockData.getCadenceDashboardData()
        this.barProgress = 0
      }))
      .subscribe();
    this.progressTimer = timer(0, this.dataChangeTimeMs / 200)
      .pipe(
        mergeMap(async (_) => {
          this.barProgress+=0.5
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.timer?.unsubscribe();
    this.progressTimer.unsubscribe();
  }
}
