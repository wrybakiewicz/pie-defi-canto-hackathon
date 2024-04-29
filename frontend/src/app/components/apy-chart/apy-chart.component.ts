import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PnlChart } from '../../models/cadence.model';

@Component({
  selector: 'app-apy-chart',
  templateUrl: './apy-chart.component.html',
  styleUrl: './apy-chart.component.scss',
})
export class ApyChartComponent implements AfterViewInit, OnInit {
  @Input() data$!: Observable<PnlChart>;
  @Input() initialData!: PnlChart;

  chartOptions: any = {};
  labelColor: any = {};
  borderColor: any = {};
  baseColor: any = {};
  baseLightColor: any = {};
  secondaryColor: any = {};

  constructor() {}

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.chartOptions = this.getChartOptions(data);
    });
  }

  ngAfterViewInit() {
    this.labelColor = this.getCssValue('--bs-gray-500');
    this.borderColor = this.getCssValue('--bs-gray-200');
    this.baseColor = this.getCssValue('--bs-primary');
    this.baseLightColor = this.getCssValue('--bs-purple');
    this.secondaryColor = this.getCssValue('--bs-success');
    this.chartOptions = this.getChartOptions(this.initialData);
  }

  getCssValue(variableName: string): string {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue(variableName).trim();
  }

  getChartOptions(pnlChart: PnlChart) {
    return {
      series: [
        {
          name: 'Supply APY',
          type: 'area',
          data: [0, 0, 0, 1.8, 4.2, 6.1],
        },
        {
          name: 'Borrow APY',
          type: 'area',
          data: [-1.8, -4.2, -6.3, -6.3, -3.9, -3.9],
        },
        {
          name: 'APY',
          type: 'line',
          data: [-1.8, -4.2, -6.3, -4.5, -0.3, -2.8],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        selection: {
          enabled: false,
        },
      },
      legend: {
        labels: {
          colors: this.labelColor,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        show: true,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          '2024-02-28',
          '2024-03-01',
          '2024-03-03',
          '2024-03-10',
          '2024-03-14',
          '2024-03-15',
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: this.labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: [
        {
          decimalsInFloat: 2,
          title: {
            text: 'Volume',
            style: {
              color: this.labelColor,
              fontSize: '12px',
            },
          },
          labels: {
            style: {
              colors: this.labelColor,
              fontSize: '12px',
            },
          },
        },
      ],
      fill: {
        type: 'solid',
        opacity: [0.5, 0.5, 1],
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
        cssClass: 'chart-tooltip',
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: number) {
            return '%' + val;
          },
        },
      },
      colors: [this.baseColor, this.baseLightColor, this.secondaryColor],
      grid: {
        borderColor: this.borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    };
  }
}
