import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../core/api/api.service';
import {HttpClient} from '@angular/common/http';

import {BaseHttpService} from '../core/base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})

export class RegisterService extends BaseHttpService<any> {

  private registerUrl = 'register/';

  constructor(public http: HttpClient, api: ApiService, private router: Router) {
    super(http, api.getServerUrl(), api);
  }

  registerUser(user) {
    return this.post(this.registerUrl, user, this.handleError).then(
      res => {
        this.storeTokens(res.token);
      }, err => {
        console.error(`Error to register user! ${err}`);
      }
    );
  }

  storeTokens(token) {
    localStorage.setItem('token', token);
  }

  protected handleError(error: any): Promise<any> {
    console.error(`Auth service error: ${error.message}`);
    return Promise.reject(error.message || error);
  }
}
