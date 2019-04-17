import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
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
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.invalid || this.formIsInvalid()) {
      return;
    }

    //do something
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
}
