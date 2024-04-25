import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TradingData } from '../models/trades.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly host = 'https://v2.piedefi.com/';

  private tradingData = new Subject<TradingData>();
  tradingData$ = this.tradingData.asObservable();

  constructor(private http: HttpClient) { }


  updateTradingData(address: string): void {
    // this.http.get<TradingData>(`${this.host}?address=${address}`)
    // .subscribe((response) => this.tradingData.next(response));
    console.log('Fire')
    this.tradingData.next({"totalVolume":956.2300000000001,"dailyVolumes":[{"date":"2024-04-21","dailyVolume":907.1800000000001},{"date":"2024-04-22","dailyVolume":36.26},{"date":"2024-04-23","dailyVolume":12.790000000000001}],"closedPositions":[{"type":"SHORT","token":"ETH","positionSizeInUsd":447.43,"openPrice":3156.62,"openDate":"2024-04-21","closePrice":3136.35,"closeDate":"2024-04-21","pnl":-0.13},{"type":"SHORT","token":"WCANTO","positionSizeInUsd":12.32,"openPrice":0.18,"openDate":"2024-04-21","closePrice":0.18,"closeDate":"2024-04-22","pnl":0.01},{"type":"SHORT","token":"WCANTO","positionSizeInUsd":10.97,"openPrice":0.18,"openDate":"2024-04-22","closePrice":0.18,"closeDate":"2024-04-22","pnl":0}],"openedPositions":[{"type":"LONG","token":"WCANTO","positionSizeInUsd":12.790000000000001,"openPrice":0.17,"openDate":"2024-04-23","pnl":0}]});
  }
}
