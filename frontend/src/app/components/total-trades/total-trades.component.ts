import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-trades',
  templateUrl: './total-trades.component.html',
  styleUrl: './total-trades.component.scss'
})
export class TotalTradesComponent {
  @Input() styleOverride: string = '';

}
