import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/common/custom-validators';
import { User } from 'src/app/common/services/authentication/auth.models';
import { AuthService } from 'src/app/common/services/authentication/auth.service';
import { StorageService } from 'src/app/common/services/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  companyName = '';
  profileFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  data: User;
  isDisabled = true;
  loading = false;
  passwordFormGroup: FormGroup;
  constructor(
    public storageService: StorageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private customValidators: CustomValidators,
    private toastr: ToastrService
  ) {
    this.data = this.storageService.currentUser;
    this.profileFormGroup = this.formBuilder.group({
      email: [
        { value: this.data.user.email, disabled: this.isDisabled },
        [Validators.required, Validators.email],
      ],
      social_number: [
        { value: this.data.user.social_number, disabled: this.isDisabled },
        [Validators.required],
      ],
      first_name: [
        { value: this.data.user.first_name, disabled: this.isDisabled },
        [Validators.required],
      ],
      last_name: [
        { value: this.data.user.last_name, disabled: this.isDisabled },
        [Validators.required],
      ],
    });
    this.companyFormGroup = this.formBuilder.group({
      social_number: [
        {
          value: this.data.user.company.social_number,
          disabled: this.isDisabled,
        },
        [Validators.required],
      ],
      name: [
        { value: this.data.user.company.name, disabled: this.isDisabled },
        [Validators.required],
      ],
    });
    this.passwordFormGroup = this.formBuilder.group(
      {
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validator: this.customValidators.mustMatch(
          'password',
          'confirmPassword'
        ),
      } as AbstractControlOptions
    );
  }

  ngOnInit(): void {
    this.companyName = `${this.storageService.currentUser.user.first_name} ${this.storageService.currentUser.user.last_name}`;
  }
  save(): void {
    if (this.profileFormGroup.dirty || this.companyFormGroup.dirty) {
      this.loading = true;
      this.authService
        .patchUser(this.profileFormGroup.value)
        .subscribe((USER) => {
          let data = this.storageService.currentUser;

          this.authService
            .patchCompany(this.companyFormGroup.value)
            .subscribe((COMPANY) => {
              USER.company = COMPANY;
              USER.id = data.user.id;
              data.user = USER;
              this.storageService.currentUser = data;
            })
            .add(() => {
              this.loading = false;
            });
        });
      this.editable();
    }
  }
  editable(): void {
    if (this.isDisabled) {
      this.isDisabled = false;
      this.profileFormGroup.controls['email'].enable();
      this.profileFormGroup.controls['social_number'].enable();
      this.profileFormGroup.controls['first_name'].enable();
      this.profileFormGroup.controls['last_name'].enable();
      this.companyFormGroup.controls['social_number'].enable();
      this.companyFormGroup.controls['name'].enable();
    } else {
      this.isDisabled = true;
      this.profileFormGroup.controls['email'].disable();
      this.profileFormGroup.controls['social_number'].disable();
      this.profileFormGroup.controls['first_name'].disable();
      this.profileFormGroup.controls['last_name'].disable();
      this.companyFormGroup.controls['social_number'].disable();
      this.companyFormGroup.controls['name'].disable();
    }
  }
  changePassword(): void {
    if (this.passwordFormGroup.valid) {
      this.loading = true;
      const data = {
        password: this.passwordFormGroup.controls['confirmPassword'].value,
      };
      this.authService
        .changePassword(data)
        .subscribe(
          (USER) => {
            this.toastr.success('Sua senha foi alterada com sucesso');
            this.passwordFormGroup.controls['password'].patchValue('');
            this.passwordFormGroup.controls['password'].setErrors(null);
            this.passwordFormGroup.controls['confirmPassword'].patchValue('');
            this.passwordFormGroup.controls['confirmPassword'].setErrors(null);
          },
          (err) =>
            this.toastr.error(
              'Houve um problema inesperado, por favor tente novamente mais tarde'
            )
        )
        .add(() => {
          this.loading = false;
        });
    }
  }
}
