import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allUsers = [];

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
    this.dashboardService.getUsers()
      .then(
        res => {
          this.allUsers = res.users;
        })
      .catch(
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500 || err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }

}
