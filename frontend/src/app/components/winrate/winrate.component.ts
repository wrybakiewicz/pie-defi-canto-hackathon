import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-winrate',
  templateUrl: './winrate.component.html',
  styleUrl: './winrate.component.scss',
})
export class WinrateComponent implements AfterViewInit {
  @Input() styleOverride: string = '';
  chartOptions: any = {};
  labelColor: any = {};
  baseColor: any = {};
  baseLightColor: any = {};
  secondaryColor: any = {};

  constructor() {}

  ngAfterViewInit() {
    this.labelColor = this.getCssValue('--bs-gray-500');
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
      series: [45, 70],
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
