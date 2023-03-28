import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BigButtonModule } from '../shared/components/big-button/big-button.module';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    BigButtonModule,
    MatSelectModule,
  ]
})
export class AuthModule { }
