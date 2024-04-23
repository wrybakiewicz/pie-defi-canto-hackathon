import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-dashboard-cadence',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-cadence.component.html',
  styleUrl: './dashboard-cadence.component.scss',
})
export class DashboardCadenceComponent implements OnInit {
  data!: CadenceData;

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.mockData.getCadenceDashboardData().subscribe((data) => {
      this.data = data;
    });
  }
}
