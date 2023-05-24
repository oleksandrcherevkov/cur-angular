import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth/auth-guard.service';
import { icon } from 'leaflet';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'map', canActivate: [AuthGuard], loadChildren: () => import('./map/map.module').then(m => m.MapModule) },
  { path: 'balance', canActivate: [AuthGuard], loadChildren: () => import('./balance/balance.module').then(m => m.BalanceModule) },
  { path: 'bike', canActivate: [AuthGuard], loadChildren: () => import('./bike/bike.module').then(m => m.BikeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
