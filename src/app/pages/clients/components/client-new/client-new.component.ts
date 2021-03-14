import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/common/custom-validators';
import { ClientService } from '../../shared/clients.service';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.scss'],
})
export class ClientNewComponent implements OnInit {
  clientFormGroup: FormGroup;
  loading = true;
  constructor(
    public dialogRef: MatDialogRef<ClientNewComponent>,
    private _formBuilder: FormBuilder,
    private customValidators: CustomValidators,
    private clientService: ClientService,
    private toastr: ToastrService
  ) {
    this.clientFormGroup = this._formBuilder.group({
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
    if (this.clientFormGroup.valid) {
      this.loading = true;
      this.clientService
        .postClients(this.clientFormGroup.value)
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
