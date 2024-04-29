import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  bootstrapArrowDownRightCircleFill,
  bootstrapArrowRepeat,
  bootstrapArrowRightShort,
  bootstrapArrowUpRightCircleFill,
  bootstrapBackspace,
  bootstrapCashCoin,
  bootstrapCheckCircle,
  bootstrapClock,
  bootstrapFiles,
  bootstrapGraphUp,
  bootstrapHourglassSplit,
  bootstrapOption,
  bootstrapQuestionCircle,
  bootstrapSearch,
  bootstrapSoundwave,
  bootstrapSpeedometer,
  bootstrapStars,
  bootstrapSymmetryVertical
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
import { lucideHandCoins, lucideLandmark, lucideSkull } from '@ng-icons/lucide';
import {
  tablerArrowWaveRightDown,
  tablerArrowWaveRightUp,
} from '@ng-icons/tabler-icons';
import {
  tdesignDespise,
  tdesignLeaderboard,
  tdesignLockOn,
} from '@ng-icons/tdesign-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApyChartComponent } from './apy-chart/apy-chart.component';
import { AssetBorrowTableComponent } from './asset-borrow-table/asset-borrow-table.component';
import { AssetSupplyTableComponent } from './asset-supply-table/asset-supply-table.component';
import { CadenceLeaderboardComponent } from './cadence-leaderboard/cadence-leaderboard.component';
import { ClosedPositionsComponent } from './closed-positions/closed-positions.component';
import { OpenedPositionsComponent } from './opened-positions/opened-positions.component';
import { PnlChartComponent } from './pnl-chart/pnl-chart.component';
import { PreSearchOverlayComponent } from './pre-search-overlay/pre-search-overlay.component';
import { StatsComponent } from './stats/stats.component';
import { SwapsTableComponent } from './swaps-table/swaps-table.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TitleComponent } from './title/title.component';
import { TotalTradesComponent } from './total-trades/total-trades.component';
import { WinrateComponent } from './winrate/winrate.component';

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
      lucideHandCoins,
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
      bootstrapCashCoin,
      lucideLandmark
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
