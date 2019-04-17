import { Injectable } from '@angular/core';
import {BaseHttpService} from '../core/base-http/base-http.service';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../core/api/api.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseHttpService<any> {

  private loginUrl = 'login/';

  constructor(public http: HttpClient, api: ApiService, private router: Router) {
    super(http, api.getServerUrl(), api);
  }

  loginUser(user) {
    return this.post(this.loginUrl, user, this.handleError).then(
      res => {
        this.storeToken(res.token);
      }
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  storeToken(token) {
    localStorage.setItem('token', token);
  }

  protected handleError(error: any): Promise<any> {
    console.error(`Auth service error: ${error.message}`);
    return Promise.reject(error.message || error);
  }

}
