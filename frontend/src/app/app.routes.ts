import { Routes } from '@angular/router';
import { DashboardCadenceComponent } from './pages/dashboard-cadence/dashboard-cadence.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardCantoLendingComponent } from './pages/dashboard-canto-lending/dashboard-canto-lending.component';
import { DashboardCantoDexComponent } from './pages/dashboard-canto-dex/dashboard-canto-dex.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard-cadence',
    component: DashboardCadenceComponent,
  },
  {
    path: 'dashboard-canto-lending',
    component: DashboardCantoLendingComponent,
  },
  {
    path: 'dashboard-canto-dex',
    component: DashboardCantoDexComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];
