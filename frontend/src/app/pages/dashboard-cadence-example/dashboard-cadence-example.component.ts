import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';

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
    this.mockData.getCadenceDashboardData().subscribe((data) => {
      this.data = data;
    });
  }
}
