import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BikeRoutingModule } from './bike-routing.module';
import { BikeComponent } from './bike.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FindBikeComponent } from './find-bike/find-bike.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    BikeComponent,
    FindBikeComponent
  ],
  imports: [
    CommonModule,
    BikeRoutingModule,
    QRCodeModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class BikeModule { }
