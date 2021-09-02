import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './pages/app-home/app-home.component';

import { AppMovieComponent } from './pages/app-movie/app-movie.component';
import { AppPageNotFoundComponent } from './pages/app-page-not-found/app-page-not-found.component';
import { AppProfileComponent } from './pages/app-profile/app-profile.component';
import { AuthGuardService as AuthGuard  } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home', component: AppHomeComponent,
  },

  {
    path: 'movie', component: AppMovieComponent,
  },

  {
    path: 'profile', component:AppProfileComponent,
  },
  {
    path: 'login',
    loadChildren:() => import('./pages/app-log-in/app-log-in.module').then(module => module.AppLogInModule),
  },
  {
    path: 'register',
    loadChildren:() => import('./pages/app-register/app-register.module').then(module => module.AppRegisterModule),
  },
  {
    path: 'booking',
    canActivate:[AuthGuard],
    loadChildren:() => import('./pages/app-booking/app-booking.module').then(module => module.AppBookingModule),
  },
  {
    path:'**', component:AppPageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
