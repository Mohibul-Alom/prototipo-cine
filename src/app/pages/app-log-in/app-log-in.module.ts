import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLogInRoutingModule } from './app-log-in-routing.module';
import { LoginViewComponent } from './components/login-view/login-view.component';


@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    AppLogInRoutingModule
  ]
})
export class AppLogInModule { }
