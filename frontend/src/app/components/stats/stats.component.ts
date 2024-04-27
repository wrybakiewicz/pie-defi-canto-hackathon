import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pulse } from 'ng-animate';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
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
export class StatsComponent implements OnChanges {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() icon: string = '';
  @Input() icons: string[] = [];
  @Input() styleOverride: string = '';

  anim: any = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.anim = !this.anim;
  }
}
