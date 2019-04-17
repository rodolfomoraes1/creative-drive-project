import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

  static ValidCredentials(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;

    if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
      AC.get('confirmPassword').setErrors( {MatchPasswordError: true} );
    }
  }
}
