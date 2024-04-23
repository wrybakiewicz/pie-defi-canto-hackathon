import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ComponentsModule } from '../../components/components.module';
import { MockDataService } from '../../services/mock-data.service';
import { CadenceData } from '../../models/cadence.model';

@Component({
  selector: 'app-dashboard-canto',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-canto.component.html',
  styleUrl: './dashboard-canto.component.scss'
})
export class DashboardCantoComponent {

  data!: CadenceData;

  constructor(private mockData: MockDataService) {
    this.mockData.getCadenceDashboardData().subscribe(data => {
      this.data = data;
    });
  }
}
