import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pnl-chart',
  templateUrl: './pnl-chart.component.html',
  styleUrl: './pnl-chart.component.scss'
})
export class PnlChartComponent implements AfterViewInit {
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
    this.chartOptions = this.getChartOptions();

  }

  getCssValue(variableName: string): string {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue(variableName).trim();
  }

  getChartOptions() {
    return {
      series: [
        {
          "name": "Net Profit",
          "type": "bar",
          "data": [45, 70, 30, 95, 55, 20, 50, 40, 60, 90, 30, 85, 35, 40]
        },
        {
          "name": "Net Loss",
          "type": "bar",
          "data": [25, 15, 35, 40, 10, 30, 25, 20, 15, 25, 35, 30, 10, 40]
        },
        {
          "name": "Volume",
          "type": "area",
          "data": [40, 100, 45, 80, 60, 95, 55, 85, 70, 100, 60, 75, 55, 90]
        }
      ],      
      chart: {
        stacked: true,
        height: 350,
        toolbar: {
          show: false,
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
        categories: ["01.04", "02.04", "03.04", "04.04", "05.04", "06.04", "07.04", "08.04", "09.04", "10.04", "11.04", "12.04", "13.04", "14.04"],
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
        max: 120,
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