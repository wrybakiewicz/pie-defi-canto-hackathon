import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData, PnlChart } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { Observable, Subject, mergeMap, timer } from 'rxjs';

@Component({
  selector: 'app-dashboard-cadence-example',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-cadence-example.component.html',
  styleUrl: './dashboard-cadence-example.component.scss',
})
export class DashboardCadenceExampleComponent implements OnInit {
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
    timer(0, 3000)
      .pipe(mergeMap(async (_) => this.mockData.getCadenceDashboardData()))
      .subscribe();
    // timer(0, 2).pipe(() => {
    //   mergeMap(_ =>
    //     this.mockData.getCadenceDashboardData().subscribe((data) => {
    //     this.data = data;
    //   }))
    // });
  }
}
