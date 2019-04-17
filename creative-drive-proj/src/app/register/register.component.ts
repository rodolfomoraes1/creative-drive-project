import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../shared/password-validation';
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  profiles = [
    {'id': 1, 'name': 'ADMIN'},
    {'id': 2, 'name': 'USER'}
  ];

  constructor(formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email]
      )],
      cpf: ['', Validators.required],
      profile: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {validators: PasswordValidation.ValidCredentials});
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.invalid || this.formIsInvalid()) {
      return;
    }

    this.registerService.registerUser(this.registerForm.value).then(data => {
      this.router.navigateByUrl('/sales');
    }, error => {
      switch (error.status) {
        case 400:
          // this.errorDisplay = true;
          // this.errorMessage = 'Error while trying to register';
          break;
        case 409:
          // this.errorDisplay = true;
          // this.errorMessage = 'Invalid username or username already taken';
          break;
      }
    });;
  }

  formIsInvalid() {
    return this.registerForm.invalid ||
      this.isNullUndefinedOrEmpty(this.registerForm.value.name) ||
      this.isNullUndefinedOrEmpty(this.registerForm.value.email) ||
      this.isNullUndefinedOrEmpty(this.registerForm.value.cpf) ||
      this.isNullUndefinedOrEmpty(this.registerForm.value.profile) ||
      this.isNullUndefinedOrEmpty(this.registerForm.value.password) ||
      this.isNullUndefinedOrEmpty(this.registerForm.value.confirmPassword);
  }

  isNullUndefinedOrEmpty(verifyValue) {
    return verifyValue === undefined || verifyValue === null || verifyValue.trim() === '';
  }

  getErrorMessage(fieldFormControl) {
    return fieldFormControl.getError('required') ? 'You must enter a value' :
      fieldFormControl.getError('email') ? 'Not a valid email' :
        'Invalid value';
  }
}
