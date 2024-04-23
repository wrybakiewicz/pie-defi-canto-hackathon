import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CadenceData } from '../../models/cadence.model';

@Component({
  selector: 'app-winrate',
  templateUrl: './winrate.component.html',
  styleUrl: './winrate.component.scss',
})
export class WinrateComponent implements AfterViewInit, OnInit{
  @Input() styleOverride: string = '';
  @Input() data$!: Observable<CadenceData>;

  wonTrades!: number;
  lostTrades!: number;


  chartOptions: any = {};
  labelColor: any = {};
  baseColor: any = {};
  baseLightColor: any = {};
  secondaryColor: any = {};

  constructor() {}

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.wonTrades = data.wonTradesCount;
      this.lostTrades = data.lostTradesCount;
      this.chartOptions = this.getChartOptions(this.wonTrades, this.lostTrades);
    })
  }

  ngAfterViewInit() {
    this.labelColor = this.getCssValue('--bs-gray-500');
    this.baseColor = this.getCssValue('--bs-success');
    this.baseLightColor = this.getCssValue('--bs-purple');
    this.secondaryColor = this.getCssValue('--bs-danger');
  }

  getCssValue(variableName: string): string {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue(variableName).trim();
  }

  getChartOptions(wonTrades: number, lostTrades: number) {
    return {
      series: [wonTrades, lostTrades],
      chart: {
        type: 'donut',
        stacked: true,
        height: 140,
        toolbar: {
          show: false,
        },
      },
      labels: ['Won', 'Lost'],
      legend: {
        show: false,
        labels: {
          colors: this.labelColor,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      states: {
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        }
      },
      colors: [this.baseColor, this.secondaryColor, this.baseLightColor],
    };
  }
}
