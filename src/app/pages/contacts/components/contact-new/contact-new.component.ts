import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/common/custom-validators';
import { ContactService } from '../../shared/contact.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss'],
})
export class ContactNewComponent implements OnInit {
  contactFormGroup: FormGroup;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<ContactNewComponent>,
    private _formBuilder: FormBuilder,
    private customValidators: CustomValidators,
    private contactService: ContactService
  ) {
    this.contactFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      social_number: [
        '',
        [Validators.required, this.customValidators.cpfCnpjValidator()],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      whatsapp: '',
      observation: '',
    });
  }

  ngOnInit(): void {}
  save(): void {
    if (this.contactFormGroup.valid) {
      this.loading = true;
      this.contactService
        .postContacts(this.contactFormGroup.value)
        .subscribe(
          (CONTACT) => {},
          (error) => {
            console.log(error);
          }
        )
        .add(() => {
          this.dialogRef.close();
        });
      return;
    }
    this.callValidator();
  }
  callValidator(): void {
    this.contactFormGroup.controls['name'].markAsTouched();
    this.contactFormGroup.controls['social_number'].markAsTouched();
    this.contactFormGroup.controls['email'].markAsTouched();
    this.contactFormGroup.controls['phone'].markAsTouched();
  }
}
