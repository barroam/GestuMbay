import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  static required(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(control.value) ? null : { email: true };
  }

  static minLength(length: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.length >= length ? null : { minlength: true };
    };
  }
}
