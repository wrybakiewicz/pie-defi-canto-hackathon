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
    this.http.get<TradingData>(`${this.host}?address=${address}`)
    .subscribe((response) => this.tradingData.next(response));
  }
}
