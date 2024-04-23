import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData, PnlChart } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { Observable, Subject, timer, mergeMap } from 'rxjs';

@Component({
  selector: 'app-dashboard-fortunafi',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-fortunafi.component.html',
  styleUrl: './dashboard-fortunafi.component.scss'
})
export class DashboardFortunafiComponent implements OnInit, AfterViewInit {
  data!: CadenceData;
  data$!: Observable<CadenceData>;
  private pnlData = new Subject<PnlChart>();
  pnlData$ = this.pnlData.asObservable();

  constructor(private mockData: MockDataService) {
    this.data$ = mockData.data$;
  }
  
  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.data = data;
      this.pnlData.next(data.pnlChart)
    });
  }

  ngAfterViewInit(): void {
    timer(0, 3000)
    .pipe(mergeMap(async (_) => this.mockData.getCadenceDashboardData()))
    .subscribe();
  }
}
