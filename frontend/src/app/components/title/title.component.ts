import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() glow: boolean = false;

  address!: string | undefined;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.subscription.add(this.api.tradingData$.subscribe((data) => {
      this.glow = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
      this.api.updateCadenceData(this.address);
    } else {
      console.error('Address is empty');
    }
  }
}
