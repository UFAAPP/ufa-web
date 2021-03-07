import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/common/custom-validators';
import { LoginErrors } from 'src/app/common/services/authentication/auth.models';
import { AuthService } from 'src/app/common/services/authentication/auth.service';
import { StorageService } from 'src/app/common/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  loading = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  cpfEmailMask = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private toastr: ToastrService,
    private customValidators: CustomValidators
  ) {
    const currentUser = this.storageService.currentUser;
    if (currentUser) {
      this.navigateTo('/home');
    }
    this.loginFormGroup = this.formBuilder.group({
      username: [
        '',
        [Validators.required, this.customValidators.cpfOrEmailValidator()],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }
    this.loading = true;
    if (this.loginFormGroup.valid) {
      this.authService
        .login(this.loginFormGroup.value)
        .subscribe(
          (login) => {
            this.router.navigateByUrl('/dashboard');
          },
          (e) => {
            if (e.error.detail === LoginErrors.WRONG_CREDENTIALS) {
              this.toastr.error('Usuário ou senha incorretos.', 'Ops!');
              return;
            }
            this.toastr.error(
              'Houve um erro inesperado, por favor tente novamente mais tarde.',
              'Ops!'
            );
          }
        )
        .add(() => {
          this.loading = false;
        });
    }
  }
  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
  setMask(): void {
    if (
      !isNaN(Number(this.loginFormGroup.controls['username'].value)) &&
      this.loginFormGroup.controls['username'].value
    ) {
      this.cpfEmailMask = '000.000.000-00';
    } else {
      this.cpfEmailMask = '';
    }
  }
}
