import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/common/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {
    const currentUser = this.storageService.currentUser;
    if (currentUser) {
      this.navigateTo('/home');
    }
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login(): void {
    console.log(this.loginFormGroup.controls['username']);
  }
  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
