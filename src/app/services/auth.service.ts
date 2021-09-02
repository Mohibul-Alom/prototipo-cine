import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(): Boolean {

    let userData = localStorage.getItem('userInfo');

    if(userData && JSON.parse(userData)) {
      return true;
    }
    return false;

  }

  public setUserInfo(user:any){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email:string, password:string) {
    return this.http.post<any>(
      `${environment.baseUrl}/auth/login`,
      { 
        email: email,
        password: password
      
      }
      
    );
  }
}
