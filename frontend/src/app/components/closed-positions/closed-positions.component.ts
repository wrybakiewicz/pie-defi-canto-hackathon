import { Component, Input } from '@angular/core';
import { Position } from '../../models/trades.model';

@Component({
  selector: 'app-closed-positions',
  templateUrl: './closed-positions.component.html',
  styleUrl: './closed-positions.component.scss',
})
export class ClosedPositionsComponent {
  @Input() positions!: Position[];
}
