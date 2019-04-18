import { Injectable } from '@angular/core';

import {BaseHttpService} from '../../core/base-http/base-http.service';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../core/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseHttpService<any> {

  private getUsersUrl = 'getUsers'

  constructor(public http: HttpClient, api: ApiService) {
    super(http, api.getServerUrl(), api);
  }

  getUsers() {
    return this.get(this.getUsersUrl, this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error(`Dashboard service error: ${error.message}`);
    return Promise.reject(error.message || error);
  }
}
