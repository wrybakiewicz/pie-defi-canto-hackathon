import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FeaturedTrade } from '../../models/featured-trades.mode';

@Component({
  selector: 'app-cadence-leaderboard',
  templateUrl: './cadence-leaderboard.component.html',
  styleUrl: './cadence-leaderboard.component.scss',
})
export class CadenceLeaderboardComponent implements OnInit{

  topTrades: FeaturedTrade[] = [];
  worstTrades: FeaturedTrade[] = [];
  allTradesCount: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getFeaturedTrades().subscribe((trades) => {
      if(trades.length < 5){
        this.topTrades = trades;
        this.allTradesCount = trades.length;
        return;
      }
      this.topTrades = trades.slice(0,5);
      this.worstTrades = trades.slice(-5);
      this.allTradesCount = trades.length
    });
  }
}
