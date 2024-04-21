import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() icon: string = '';
  @Input() icons: string[] = [];
  @Input() styleOverride: string = '';
}
