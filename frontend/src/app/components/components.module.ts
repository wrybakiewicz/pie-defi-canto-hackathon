import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapSearch, bootstrapBackspace, bootstrapArrowDownRightCircleFill, bootstrapArrowUpRightCircleFill, bootstrapCoin, bootstrapFiles, bootstrapGraphUp, bootstrapHourglassSplit, bootstrapOption, bootstrapSoundwave, bootstrapSpeedometer, bootstrapStars, bootstrapSymmetryVertical } from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { TitleComponent } from './title/title.component';
import { StatsComponent } from './stats/stats.component';
import { cryptoEth, cryptoTusd, cryptoUsdc, cryptoXrp, cryptoSushi } from '@ng-icons/cryptocurrency-icons';
import { tdesignLockOn, tdesignLeaderboard, tdesignDespise } from '@ng-icons/tdesign-icons';
import { PnlChartComponent } from './pnl-chart/pnl-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClosedPositionsComponent } from './closed-positions/closed-positions.component';
import { OpenedPositionsComponent } from './opened-positions/opened-positions.component';



@NgModule({
  declarations: [TitleComponent, StatsComponent, PnlChartComponent, ClosedPositionsComponent, OpenedPositionsComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgIconsModule.withIcons({
      bootstrapSearch, bootstrapBackspace,
      bootstrapSymmetryVertical, bootstrapSoundwave, bootstrapSpeedometer, bootstrapStars, bootstrapGraphUp,
      bootstrapOption, bootstrapFiles,
      tdesignLockOn, tdesignLeaderboard, tdesignDespise, bootstrapCoin,
      cryptoEth, cryptoTusd, cryptoUsdc, cryptoXrp, cryptoSushi,
      bootstrapArrowUpRightCircleFill, bootstrapArrowDownRightCircleFill, bootstrapHourglassSplit})
  ],
  exports: [TitleComponent, StatsComponent, PnlChartComponent, ClosedPositionsComponent, OpenedPositionsComponent]
})
export class ComponentsModule { }
