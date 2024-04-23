import { AfterViewInit, Component, Input } from '@angular/core';
import { PnlChart } from '../../models/cadence.model';

@Component({
  selector: 'app-pnl-chart',
  templateUrl: './pnl-chart.component.html',
  styleUrl: './pnl-chart.component.scss'
})
export class PnlChartComponent implements AfterViewInit {

  @Input() data!: PnlChart;

  chartOptions: any = {};
  labelColor: any = {};
  borderColor: any = {};
  baseColor: any = {};
  baseLightColor: any = {};
  secondaryColor: any = {};

  constructor() {}

  ngAfterViewInit() {
    this.labelColor = this.getCssValue('--bs-gray-500');
    this.borderColor = this.getCssValue('--bs-gray-200');
    this.baseColor = this.getCssValue('--bs-success');
    this.baseLightColor = this.getCssValue('--bs-purple');
    this.secondaryColor = this.getCssValue('--bs-danger');
    this.chartOptions = this.getChartOptions(this.data);
  }

  getCssValue(variableName: string): string {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue(variableName).trim();
  }

  getChartOptions(pnlChart: PnlChart) {
    return {
      series: [
        {
          "name": "Profit",
          "type": "bar",
          "data": pnlChart.profit
        },
        {
          "name": "Loss",
          "type": "bar",
          "data": pnlChart.loss
        },
        {
          "name": "Volume",
          "type": "area",
          "data": pnlChart.volume
        }
      ],
      chart: {
        stacked: true,
        height: 350,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true
        }
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
          colors: this.labelColor
        }
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
      yaxis: {
        labels: {
          style: {
            colors: this.labelColor,
            fontSize: '12px',
          },
        },
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
        cssClass: 'chart-tooltip',
        style: {
          fontSize: '12px',

        },
        y: {
          formatter: function (val: number) {
            return '$' + val;
          },
        },
      },
      colors: [this.baseColor, this.secondaryColor, this.baseLightColor],
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
