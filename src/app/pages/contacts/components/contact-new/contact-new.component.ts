import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/common/custom-validators';
import { ContactService } from '../../shared/contact.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss'],
})
export class ContactNewComponent implements OnInit {
  contactFormGroup: FormGroup;
  loading = true;
  constructor(
    public dialogRef: MatDialogRef<ContactNewComponent>,
    private _formBuilder: FormBuilder,
    private customValidators: CustomValidators,
    private contactService: ContactService,
    private toastr: ToastrService
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
            this.toastr.error(
              'Houve algum problema inesperado, tente novamente mais tarde'
            );
          }
        )
        .add(() => {
          this.dialogRef.close();
        });
      return;
    }
  }
}
