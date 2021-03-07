import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {
  isEmail = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  constructor() {}

  checkFormatDate(input: FormControl): { invalidDate: true } | null {
    return moment(input.value, 'DDMMYYYY').isValid()
      ? null
      : { invalidDate: true };
  }

  checkMinAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthday = moment(control.value, 'DDMMYYYY');
      const age = moment.duration(moment().diff(birthday)).asYears();
      return age >= 16 ? null : { minAge: true };
    };
  }
  cpfOrEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (isNaN(Number(control.value))) {
        if (!this.isEmail.test(control.value)) {
          return { invalidEmail: true };
        }
      } else {
        if (control.value.length === 11) {
          if (!this.isCpf(control.value)) {
            return { invalidCpf: true };
          }
        } else {
          return { invalidCpf: true };
        }
      }

      return null;
    };
  }
  cpfCnpjValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpfCnpj = control.value;
      if (!cpfCnpj) {
        return null;
      }
      if (cpfCnpj.length === 11) {
        if (!this.isCpf(cpfCnpj)) {
          return { invalidCpf: true };
        }
      } else if (cpfCnpj.length === 14) {
        if (!this.isCnpj(cpfCnpj)) {
          return { invalidCnpj: true };
        }
      }
      return null;
    };
  }
  /* tslint:disable: typedef */
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control!.value !== matchingControl!.value) {
        matchingControl!.setErrors({ mustMatch: true });
      } else {
        matchingControl!.setErrors(null);
      }
    };
  }
  onlyNumbers(fieldValue: string): string {
    return fieldValue.replace(/\D/g, '');
  }

  isCpf(CPF: string): boolean {
    let sum: number;
    let leftover: number;
    const strCPF = this.onlyNumbers(CPF);
    sum = 0;
    if (strCPF === '00000000000') {
      return false;
    }
    if (strCPF === '11111111111') {
      return false;
    }
    if (strCPF === '22222222222') {
      return false;
    }
    if (strCPF === '33333333333') {
      return false;
    }
    if (strCPF === '44444444444') {
      return false;
    }
    if (strCPF === '55555555555') {
      return false;
    }
    if (strCPF === '66666666666') {
      return false;
    }
    if (strCPF === '77777777777') {
      return false;
    }
    if (strCPF === '88888888888') {
      return false;
    }
    if (strCPF === '99999999999') {
      return false;
    }
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
    }
    leftover = (sum * 10) % 11;
    if (leftover === 10 || leftover === 11) {
      leftover = 0;
    }
    if (leftover !== parseInt(strCPF.substring(9, 10), 10)) {
      return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
    }
    leftover = (sum * 10) % 11;
    if (leftover === 10 || leftover === 11) {
      leftover = 0;
    }
    if (leftover !== parseInt(strCPF.substring(10, 11), 10)) {
      return false;
    }
    return true;
  }

  isCnpj(c: any): boolean {
    const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let n = 0;
    let p = 0;
    c = c.replace(/[^\d]/g, '');
    if (c.length !== 14) {
      return false;
    }
    if (/0{14}/.test(c)) {
      return false;
    }
    for (let i = 0; i < 12; i++) {
      n += c[i] * b[i + 1];
    }
    let rest = (n %= 11);
    if (parseInt(c[12], 10) !== (rest < 2 ? 0 : 11 - n)) {
      return false;
    }
    for (let i = 0; i <= 12; i++) {
      p += c[i] * b[i];
    }
    rest = p %= 11;
    if (parseInt(c[13], 10) !== (rest < 2 ? 0 : 11 - p)) {
      return false;
    }
    return true;
  }
}
