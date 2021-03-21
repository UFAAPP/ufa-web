import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LAWSUITMASK } from 'src/app/pages/lawsuit/shared/lawsuit-model';
import { Client } from '../../shared/clients-model';
import { ClientService } from '../../shared/clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  clientFormGroup: FormGroup;
  isDisabled = true;
  loading = false;
  panelOpenState = false;
  lawsuitMask = LAWSUITMASK;
  constructor(
    @Inject(MAT_DIALOG_DATA) public client: Client,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientDetailComponent>,
    private clientService: ClientService,
    private toastr: ToastrService
  ) {
    this.clientFormGroup = this._formBuilder.group({
      name: [
        { value: client.name, disabled: this.isDisabled },
        [Validators.required],
      ],
      social_number: [
        { value: client.social_number, disabled: this.isDisabled },
        [Validators.required],
      ],
      email: [
        { value: client.email, disabled: this.isDisabled },
        [Validators.required, Validators.email],
      ],
      phone: [
        { value: client.phone, disabled: this.isDisabled },
        [Validators.required],
      ],
      whatsapp: [
        { value: client.whatsapp, disabled: this.isDisabled },
        [Validators.required],
      ],
      observation: [
        { value: client.observation, disabled: this.isDisabled },
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {}
  editable(): void {
    this.isDisabled = false;
    this.clientFormGroup.controls['name'].enable();
    this.clientFormGroup.controls['social_number'].enable();
    this.clientFormGroup.controls['email'].enable();
    this.clientFormGroup.controls['phone'].enable();
    this.clientFormGroup.controls['whatsapp'].enable();
    this.clientFormGroup.controls['observation'].enable();
  }
  save(): void {
    if (this.clientFormGroup.dirty) {
      this.clientService
        .patchClients(this.clientFormGroup.value, this.client.id!)
        .subscribe((CLIENTS) => {
          this.toastr.success('Contato adicionado com sucesso!');
          this.dialogRef.close();
        });
    } else {
      this.dialogRef.close();
    }
  }
  openWhatsApp() {
    const whatsapp = this.clientFormGroup.controls['whatsapp'].value;
    if (whatsapp) {
      window.open(`https://wa.me/55${whatsapp}`, '_blank');
    }
  }
}
