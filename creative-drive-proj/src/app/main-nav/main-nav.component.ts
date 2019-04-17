import { Component } from '@angular/core';

import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  constructor(private loginService: LoginService) {}

}
