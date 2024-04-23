import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PnlChart, PnlDataPoint } from '../../models/cadence.model';

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
    const profits = this.extractProfits(pnlChart);
    const losses = this.extractLosses(pnlChart);
    const volumes = this.extractVolumes(pnlChart);
    const labels = this.getAllKeysAsString(pnlChart);
    debugger;
    return {
      series: [
        {
          "name": "Profit",
          "type": "bar",
          "data": profits
        },
        {
          "name": "Loss",
          "type": "bar",
          "data": losses
        },
        {
          "name": "Volume",
          "type": "area",
          "data": volumes
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
        categories: labels,
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

  private extractProfits(pnlChart: PnlChart): number[] {
    let profitValues: number[] = [];
    pnlChart.data.forEach((dataPoint: PnlDataPoint) => {
        profitValues.push(dataPoint.profit);
    });
    return profitValues;
  }

  private extractLosses(pnlChart: PnlChart): number[] {
    let lossValues: number[] = [];
    pnlChart.data.forEach((dataPoint: PnlDataPoint) => {
        lossValues.push(dataPoint.loss);
    });
    return lossValues;
  }

  private extractVolumes(pnlChart: PnlChart): number[] {
    let volumeValues: number[] = [];
    pnlChart.data.forEach((dataPoint: PnlDataPoint) => {
        volumeValues.push(dataPoint.volume);
    });
    return volumeValues;
  }

  private getAllKeysAsString(pnlChart: PnlChart): string[] {
    let keysAsStrings: string[] = [];
    pnlChart.data.forEach((_, key: Date) => {
        let day = key.getDate().toString().padStart(2, '0'); // Ensures the day is two digits
        let month = (key.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, add 1
        keysAsStrings.push(`${day}.${month}`);
    });
    return keysAsStrings;
}
}