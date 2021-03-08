import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../shared/contact.service';
import { Contact } from '../../shared/contacts-model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  contactFormGroup: FormGroup;
  isDisabled = true;
  loading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public contact: Contact,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ContactDetailComponent>,
    private contactService: ContactService,
    private toastr: ToastrService
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
      this.contactService
        .patchContacts(this.contactFormGroup.value, this.contact.id!)
        .subscribe((CONTACT) => {
          this.toastr.success('Contato adicionado com sucesso!');
          this.dialogRef.close();
        });
    } else {
      this.dialogRef.close();
    }
  }
}
