import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';
import { DashboardCadenceExampleComponent } from '../dashboard-cadence-example/dashboard-cadence-example.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-cadence',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ComponentsModule, DashboardCadenceExampleComponent],
  templateUrl: './dashboard-cadence.component.html',
  styleUrl: './dashboard-cadence.component.scss',
})
export class DashboardCadenceComponent implements OnInit {
  data!: CadenceData;

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    // this.mockData.getCadenceDashboardData().subscribe((data) => {
    //   // this.data = data;
    // });
  }
}
