import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { mergeMap, timer } from 'rxjs';

@Component({
  selector: 'app-dashboard-cadence-example',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-cadence-example.component.html',
  styleUrl: './dashboard-cadence-example.component.scss',
})
export class DashboardCadenceExampleComponent implements OnInit {
  data!: CadenceData;

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    timer(0, 2000)
      .pipe(
        mergeMap(async (_) =>
          this.mockData.getCadenceDashboardData().subscribe((data) => {
            this.data = data;
          })
        )
      )
      .subscribe();
    // timer(0, 2).pipe(() => {
    //   mergeMap(_ =>
    //     this.mockData.getCadenceDashboardData().subscribe((data) => {
    //     this.data = data;
    //   }))
    // });
  }
}
