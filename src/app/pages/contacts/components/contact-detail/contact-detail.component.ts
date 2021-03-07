import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IContact } from '../../shared/contacts-model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  contactFormGroup: FormGroup;
  isDisabled = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public contact: IContact,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ContactDetailComponent>
  ) {
    this.contactFormGroup = this._formBuilder.group({
      name: [
        { value: contact.name, disabled: this.isDisabled },
        [Validators.required],
      ],
      social_number: [
        { value: contact.social_number, disabled: this.isDisabled },
        [Validators.required],
      ],
      email: [
        { value: contact.email, disabled: this.isDisabled },
        [Validators.required, Validators.email],
      ],
      phone: [
        { value: contact.phone, disabled: this.isDisabled },
        [Validators.required],
      ],
      whatsapp: [
        { value: contact.whatsapp, disabled: this.isDisabled },
        [Validators.required],
      ],
      observation: [
        { value: contact.observation, disabled: this.isDisabled },
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {}
  editable(): void {
    this.isDisabled = false;
    this.contactFormGroup.controls['name'].enable();
    this.contactFormGroup.controls['social_number'].enable();
    this.contactFormGroup.controls['email'].enable();
    this.contactFormGroup.controls['phone'].enable();
    this.contactFormGroup.controls['whatsapp'].enable();
    this.contactFormGroup.controls['observation'].enable();
  }
  save(): void {
    if (this.contactFormGroup.dirty) {
    } else {
      this.dialogRef.close();
    }
  }
}
