import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingViewComponent } from './components/booking-view/booking-view.component';

const routes: Routes = [
  {
    path:'',
    component: BookingViewComponent,
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBookingRoutingModule { }
