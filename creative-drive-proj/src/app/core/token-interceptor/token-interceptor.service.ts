import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

import {LoginService} from '../../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req, next) {

    req = this.buildHeaders(req);

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.handleUnathorizedErrors(error.error);
        }

        return next.handle(req).pipe(
          catchError((err) => {
            if (err.status === 401) {
              this.handleUnathorizedErrors(err.error);
            }
            return throwError(err);
          })
        );
        return throwError(error);
      })
    );
  }

  buildHeaders(req) {
    const token = this.loginService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
    return req;
  }

  handleUnathorizedErrors(errorMessage) {
    switch (errorMessage) {
      case 'Invalid email':
        console.log('Invalid email error');
        break;
      case 'Invalid password':
        console.log('Invalid password error');
        break;
      case 'Unauthorized request':
        console.log('Unauthorized request error');
        this.loginService.logoutUser();
        break;
      default:
        console.log('Unauthorized unknown error');
        this.loginService.logoutUser();
        break;
    }
  }
}
