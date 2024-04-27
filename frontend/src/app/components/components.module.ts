import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  bootstrapArrowDownRightCircleFill,
  bootstrapArrowRightShort,
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
  bootstrapSymmetryVertical,
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import {
  cryptoEth,
  cryptoSushi,
  cryptoTusd,
  cryptoUsdc,
  cryptoXrp,
} from '@ng-icons/cryptocurrency-icons';
import { jamCrown } from '@ng-icons/jam-icons';
import {
  tdesignDespise,
  tdesignLeaderboard,
  tdesignLockOn,
} from '@ng-icons/tdesign-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CadenceLeaderboardComponent } from './cadence-leaderboard/cadence-leaderboard.component';
import { ClosedPositionsComponent } from './closed-positions/closed-positions.component';
import { OpenedPositionsComponent } from './opened-positions/opened-positions.component';
import { PnlChartComponent } from './pnl-chart/pnl-chart.component';
import { PreSearchOverlayComponent } from './pre-search-overlay/pre-search-overlay.component';
import { StatsComponent } from './stats/stats.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TitleComponent } from './title/title.component';
import { TotalTradesComponent } from './total-trades/total-trades.component';
import { WinrateComponent } from './winrate/winrate.component';
import { FormsModule } from '@angular/forms';
import { octArrowUpRight, octArrowDownRight } from '@ng-icons/octicons';
import {
  tablerArrowWaveRightDown,
  tablerArrowWaveRightUp,
} from '@ng-icons/tabler-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    TitleComponent,
    StatsComponent,
    PnlChartComponent,
    ClosedPositionsComponent,
    OpenedPositionsComponent,
    TimelineComponent,
    WinrateComponent,
    TotalTradesComponent,
    CadenceLeaderboardComponent,
    PreSearchOverlayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    NgxSpinnerModule,
    NgbModule,
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
      bootstrapClock,
      jamCrown,
      bootstrapArrowRightShort,
      tablerArrowWaveRightDown,
      tablerArrowWaveRightUp,
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
    TotalTradesComponent,
    CadenceLeaderboardComponent,
    PreSearchOverlayComponent,
  ],
})
export class ComponentsModule {}
