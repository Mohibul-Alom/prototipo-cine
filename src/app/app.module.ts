import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';


import { GlobalService } from './services/global.service';
import { AppProfileComponent } from './pages/app-profile/app-profile.component';
import { AppLogInComponent } from './pages/app-log-in/app-log-in.component';
import { AppRegisterComponent } from './pages/app-register/app-register.component';
import { AppBookingComponent } from './pages/app-booking/app-booking.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppProfileComponent,
    AppLogInComponent,
    AppRegisterComponent,
    AppBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
