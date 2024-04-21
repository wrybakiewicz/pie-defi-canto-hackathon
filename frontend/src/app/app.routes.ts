import { Routes } from '@angular/router';
import { DashboardCadenceComponent } from './pages/dashboard-cadence/dashboard-cadence.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardCantoComponent } from './pages/dashboard-canto/dashboard-canto.component';
import { DashboardFortunafiComponent } from './pages/dashboard-fortunafi/dashboard-fortunafi.component';

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
    path: 'dashboard-canto',
    component: DashboardCantoComponent,
  },
  {
    path: 'dashboard-fortunafi',
    component: DashboardFortunafiComponent,
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
