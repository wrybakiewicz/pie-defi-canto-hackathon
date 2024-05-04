import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PnlChart } from '../../models/cadence.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pnl-chart',
  templateUrl: './pnl-chart.component.html',
  styleUrl: './pnl-chart.component.scss',
})
export class PnlChartComponent implements AfterViewInit, OnInit {
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
    this.secondaryColor = this.getCssValue('--bs-danger');
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
          name: 'Volume',
          type: 'bar',
          data: pnlChart.volume,
        },
        {
          name: 'PnL',
          type: 'area',
          data: pnlChart.pnl,
        },
      ],
      chart: {
        height: 350,
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
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 3,
          columnWidth: '40%',
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
        categories: pnlChart.labels,
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
          opposite: true,
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
        {
          decimalsInFloat: 2,
          title: {
            text: 'PnL',
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
        cssClass: 'chart-tooltip',
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: number) {
            return '$' + val?.toFixed(2);
          },
        },
      },
      colors: [this.baseColor, this.baseLightColor],
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
