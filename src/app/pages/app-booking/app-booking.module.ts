import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBookingRoutingModule } from './app-booking-routing.module';
import { BookingViewComponent } from './components/booking-view/booking-view.component';
import { BookingOptionComponent } from './components/booking-view/booking-option/booking-option.component';
import { BookingSeatsComponent } from './components/booking-view/booking-seats/booking-seats.component';


@NgModule({
  declarations: [
    BookingViewComponent,
    BookingOptionComponent,
    BookingSeatsComponent
  ],
  imports: [
    CommonModule,
    AppBookingRoutingModule
  ]
})
export class AppBookingModule { }
