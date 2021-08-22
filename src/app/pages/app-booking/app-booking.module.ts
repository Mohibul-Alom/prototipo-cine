import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBookingRoutingModule } from './app-booking-routing.module';
import { BookingViewComponent } from './components/booking-view/booking-view.component';


@NgModule({
  declarations: [
    BookingViewComponent
  ],
  imports: [
    CommonModule,
    AppBookingRoutingModule
  ]
})
export class AppBookingModule { }
