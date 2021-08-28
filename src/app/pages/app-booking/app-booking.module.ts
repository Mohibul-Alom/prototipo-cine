import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBookingRoutingModule } from './app-booking-routing.module';
import { BookingOptionComponent } from './components/booking-option/booking-option.component';
import { BookingSeatsComponent } from './components/booking-seats/booking-seats.component';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BookingOptionComponent,
    BookingSeatsComponent,
  ],
  imports: [
    CommonModule,
    AppBookingRoutingModule,
    ReactiveFormsModule
  ]
})
export class AppBookingModule { }
