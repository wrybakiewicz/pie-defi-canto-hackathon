import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-dashboard-canto',
  standalone: true,
  imports: [HeaderComponent, ComponentsModule],
  templateUrl: './dashboard-canto.component.html',
  styleUrl: './dashboard-canto.component.scss'
})
export class DashboardCantoComponent {

}
