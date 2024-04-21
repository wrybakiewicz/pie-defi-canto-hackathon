import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'app-dashboard-cadence',
  standalone: true,
  imports: [HeaderComponent, TitleComponent],
  templateUrl: './dashboard-cadence.component.html',
  styleUrl: './dashboard-cadence.component.scss',
})
export class DashboardCadenceComponent {}
