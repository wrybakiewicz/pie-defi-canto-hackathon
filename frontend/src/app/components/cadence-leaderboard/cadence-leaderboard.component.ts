import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FeaturedTrade } from '../../models/featured-trades.mode';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadence-leaderboard',
  templateUrl: './cadence-leaderboard.component.html',
  styleUrl: './cadence-leaderboard.component.scss',
})
export class CadenceLeaderboardComponent implements OnInit {
  topTrades: FeaturedTrade[] = [];
  worstTrades: FeaturedTrade[] = [];
  allTradesCount: number = 0;

  constructor(private router: Router, private api: ApiService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show('leaderboard');
    this.api.getFeaturedTrades().subscribe((trades) => {
      this.spinner.hide('leaderboard');
      if (trades.length < 5) {
        this.topTrades = trades;
        this.allTradesCount = trades.length;
        return;
      }
      this.topTrades = trades.slice(0, 5);
      this.worstTrades = trades.slice(-5);
      this.allTradesCount = trades.length;
    });
  }

  onTradeSelected(address: string) {
    this.spinner.show();
    this.router
      .navigateByUrl(`/dashboard-cadence?address=${address}`);
  }
}
