import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  bootstrapArrowDownRightCircleFill,
  bootstrapArrowUpRightCircleFill,
  bootstrapBackspace,
  bootstrapCheck2Circle,
  bootstrapClock,
  bootstrapCoin,
  bootstrapFiles,
  bootstrapGraphUp,
  bootstrapHourglassSplit,
  bootstrapOption,
  bootstrapSearch,
  bootstrapSoundwave,
  bootstrapSpeedometer,
  bootstrapStars,
  bootstrapSymmetryVertical
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import {
  cryptoEth,
  cryptoSushi,
  cryptoTusd,
  cryptoUsdc,
  cryptoXrp,
} from '@ng-icons/cryptocurrency-icons';
import {
  tdesignDespise,
  tdesignLeaderboard,
  tdesignLockOn,
} from '@ng-icons/tdesign-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClosedPositionsComponent } from './closed-positions/closed-positions.component';
import { OpenedPositionsComponent } from './opened-positions/opened-positions.component';
import { PnlChartComponent } from './pnl-chart/pnl-chart.component';
import { StatsComponent } from './stats/stats.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TitleComponent } from './title/title.component';
import { WinrateComponent } from './winrate/winrate.component';
import { TotalTradesComponent } from './total-trades/total-trades.component';

@NgModule({
  declarations: [
    TitleComponent,
    StatsComponent,
    PnlChartComponent,
    ClosedPositionsComponent,
    OpenedPositionsComponent,
    TimelineComponent,
    WinrateComponent,
    TotalTradesComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgIconsModule.withIcons({
      bootstrapSearch,
      bootstrapBackspace,
      bootstrapSymmetryVertical,
      bootstrapSoundwave,
      bootstrapSpeedometer,
      bootstrapStars,
      bootstrapGraphUp,
      bootstrapOption,
      bootstrapFiles,
      tdesignLockOn,
      tdesignLeaderboard,
      tdesignDespise,
      bootstrapCoin,
      cryptoEth,
      cryptoTusd,
      cryptoUsdc,
      cryptoXrp,
      cryptoSushi,
      bootstrapArrowUpRightCircleFill,
      bootstrapArrowDownRightCircleFill,
      bootstrapHourglassSplit,
      bootstrapCheck2Circle,
      bootstrapClock
    }),
  ],
  exports: [
    TitleComponent,
    StatsComponent,
    PnlChartComponent,
    ClosedPositionsComponent,
    OpenedPositionsComponent,
    TimelineComponent,
    WinrateComponent,
    TotalTradesComponent
  ],
})
export class ComponentsModule {}
