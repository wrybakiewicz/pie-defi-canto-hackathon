import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FeaturedTrade } from '../../models/featured-trades.mode';

@Component({
  selector: 'app-cadence-leaderboard',
  templateUrl: './cadence-leaderboard.component.html',
  styleUrl: './cadence-leaderboard.component.scss',
})
export class CadenceLeaderboardComponent implements OnInit{

  trades: FeaturedTrade[] = [];

  constructor(private api: ApiService) { }
  
  ngOnInit(): void {
    this.api.getFeaturedTrades().subscribe((trades) => {
      this.trades = trades;
    });
  }
}
