import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pulse } from 'ng-animate';

@Component({
  selector: 'app-total-trades',
  templateUrl: './total-trades.component.html',
  styleUrl: './total-trades.component.scss',
  animations: [
    trigger('pulse', [
      transition(
        '* => *',
        useAnimation(pulse, {
          params: { timing: 0.3, delay: 0 },
        })
      ),
    ]),
  ],
})
export class TotalTradesComponent implements OnChanges {
  @Input() styleOverride: string = '';
  @Input() openedTrades!: number;
  @Input() closedTrades!: number;

  anim: any = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.anim = !this.anim;
  }
}
