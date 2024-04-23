import { Component } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CadenceData } from '../../models/cadence.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-dashboard-fortunafi',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-fortunafi.component.html',
  styleUrl: './dashboard-fortunafi.component.scss'
})
export class DashboardFortunafiComponent {
  
  data!: CadenceData;

  constructor(private mockData: MockDataService) {
    this.mockData.getCadenceDashboardData().subscribe(data => {
      this.data = data;
    });
  }
}
