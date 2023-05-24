import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComponent } from './balance.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    MatListModule,
    MatButtonModule,
  ]
})
export class BalanceModule { }
