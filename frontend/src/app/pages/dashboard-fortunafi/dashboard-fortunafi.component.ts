import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-dashboard-fortunafi',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-fortunafi.component.html',
  styleUrl: './dashboard-fortunafi.component.scss'
})
export class DashboardFortunafiComponent {

}
