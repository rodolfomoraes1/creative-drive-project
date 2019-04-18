import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(formBuilder: FormBuilder, private loginService: LoginService, private router: Router,
              private snackBar: MatSnackBar) {
    this.loginForm = formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.email]
        )],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.invalid || this.formIsInvalid()) {
      return;
    }

    this.loginService.loginUser(this.loginForm.value).then(data => {
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.error('Login error!', error.status);
      this.openSnackBar('Login error!', 'OK');
    });
  }

  formIsInvalid() {
    return this.loginForm.invalid ||
      this.isNullUndefinedOrEmpty(this.loginForm.value.email) ||
      this.isNullUndefinedOrEmpty(this.loginForm.value.password);
  }

  isNullUndefinedOrEmpty(verifyValue) {
    return verifyValue === undefined || verifyValue === null || verifyValue.trim() === '';
  }

  getErrorMessage(fieldFormControl) {
    return fieldFormControl.getError('required') ? 'You must enter a value' :
      fieldFormControl.getError('email') ? 'Not a valid email' :
        'Invalid value';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
