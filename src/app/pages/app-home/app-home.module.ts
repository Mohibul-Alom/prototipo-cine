import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHomeRoutingModule } from './app-home-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    AppHomeRoutingModule
  ]
})
export class AppHomeModule { }
