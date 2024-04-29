import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() glow: boolean = false;

  address!: string | undefined;
  isAddressInvalid: boolean = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.api.tradingData$.subscribe((data) => {
        this.glow = false;
        this.address = data.address;
        this.spinner.hide();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, {
      paths: 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored',
    });
  }

  onDelete() {
    this.address = '';
  }

  onSearch() {
    if (this.address && this.address.length === 42) {
      this.api.updateCadenceData(this.address);
      this.spinner.show();
    } else {
      this.isAddressInvalid = true;
    }
  }

  resetValidationMessage() {
    this.isAddressInvalid = false;
  }
}
