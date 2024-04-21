import { Routes } from '@angular/router';
import { DashboardCadenceComponent } from './pages/dashboard-cadence/dashboard-cadence.component';
import { HomeComponent } from './pages/home/home.component';

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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];
