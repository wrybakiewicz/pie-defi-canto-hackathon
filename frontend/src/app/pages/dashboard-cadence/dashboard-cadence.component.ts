import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData, PnlChart } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { DashboardCadenceExampleComponent } from '../dashboard-cadence-example/dashboard-cadence-example.component';
import { CommonModule } from '@angular/common';
import { Subscription, Observable, Subject, timer, mergeMap } from 'rxjs';

@Component({
  selector: 'app-dashboard-cadence',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ComponentsModule, DashboardCadenceExampleComponent],
  templateUrl: './dashboard-cadence.component.html',
  styleUrl: './dashboard-cadence.component.scss',
})
export class DashboardCadenceComponent implements OnInit, AfterViewInit {
  // Show example for testing purposes
  private readonly showExample = true;

  private subscription: Subscription = new Subscription();

  data!: CadenceData;
  data$!: Observable<CadenceData>;
  private pnlData = new Subject<PnlChart>();
  pnlData$ = this.pnlData.asObservable();

  constructor(private mockData: MockDataService) {
    this.data$ = mockData.data$;
  }
  
  ngOnInit(): void {
    if(!this.showExample){
      this.subscription.add(this.data$.subscribe((data) => {
        this.data = data;
        this.pnlData.next(data.pnlChart)
      }));
      this.mockData.getCadenceDashboardData()
    }
  }

  ngAfterViewInit(): void {
    if(!this.showExample){
      this.mockData.getCadenceDashboardData()
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
