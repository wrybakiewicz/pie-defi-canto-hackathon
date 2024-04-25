import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {

  @Input() glow: boolean = false;

  address!: string | undefined;

  constructor(private router: Router, private api: ApiService) {}

  isActive(url: string): boolean {
    return this.router.isActive(url, {
      paths: 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored'
    });
  }

  onDelete() {
    this.address = '';
  }

  onSearch() {
    if(this.address){
      this.api.updateTradingData(this.address);
    } else {
      console.error('Address is empty');
    }
  }
}
