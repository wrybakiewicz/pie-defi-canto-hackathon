import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-winrate',
  templateUrl: './winrate.component.html',
  styleUrl: './winrate.component.scss'
})
export class WinrateComponent {

  @Input() styleOverride: string = '';
}
