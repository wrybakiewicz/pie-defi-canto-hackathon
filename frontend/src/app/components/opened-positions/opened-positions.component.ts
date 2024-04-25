import { Component, Input } from '@angular/core';
import { Position } from '../../models/trades.model';

@Component({
  selector: 'app-opened-positions',
  templateUrl: './opened-positions.component.html',
  styleUrl: './opened-positions.component.scss'
})
export class OpenedPositionsComponent {

  @Input() positions!: Position[];
}
