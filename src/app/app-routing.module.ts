import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { AppLogInComponent } from './pages/app-log-in/app-log-in.component';
import { AppMovieComponent } from './pages/app-movie/app-movie.component';
import { AppProfileComponent } from './pages/app-profile/app-profile.component';
import { AppRegisterComponent } from './pages/app-register/app-register.component';

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
    path: 'login', component:AppLogInComponent,
  },
  {
    path: 'register',component:AppRegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
