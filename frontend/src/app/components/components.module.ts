import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  bootstrapArrowDownRightCircleFill,
  bootstrapArrowRepeat,
  bootstrapArrowRightShort,
  bootstrapArrowUpRightCircleFill,
  bootstrapBackspace,
  bootstrapCashCoin,
  bootstrapCheckCircle,
  bootstrapClock,
  bootstrapCoin,
  bootstrapFiles,
  bootstrapGraphUp,
  bootstrapHourglassSplit,
  bootstrapOption,
  bootstrapQuestionCircle,
  bootstrapSearch,
  bootstrapSoundwave,
  bootstrapSpeedometer,
  bootstrapStars,
  bootstrapSymmetryVertical,
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import {
  cryptoAtom,
  cryptoEth,
  cryptoSushi,
  cryptoTusd,
  cryptoUsdc,
  cryptoUsdt,
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
import { lucideSkull } from '@ng-icons/lucide';
import { SwapsTableComponent } from './swaps-table/swaps-table.component';
import { AssetBorrowTableComponent } from './asset-borrow-table/asset-borrow-table.component';
import { AssetSupplyTableComponent } from './asset-supply-table/asset-supply-table.component';
import { ApyChartComponent } from './apy-chart/apy-chart.component';

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
    SwapsTableComponent,
    AssetBorrowTableComponent,
    AssetSupplyTableComponent,
    ApyChartComponent
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
      bootstrapCheckCircle,
      bootstrapClock,
      bootstrapQuestionCircle,
      jamCrown,
      bootstrapArrowRightShort,
      tablerArrowWaveRightDown,
      tablerArrowWaveRightUp,
      lucideSkull,
      cryptoAtom,
      cryptoUsdt,
      bootstrapArrowRepeat,
      bootstrapCashCoin
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
    SwapsTableComponent,
    AssetBorrowTableComponent,
    AssetSupplyTableComponent,
    ApyChartComponent
  ],
})
export class ComponentsModule {}
