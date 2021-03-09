import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/pages/contacts/shared/contact.service';
import { Contact } from 'src/app/pages/contacts/shared/contacts-model';
import { Locker } from 'src/app/pages/lockers/shared/locker.model';
import { LockerService } from 'src/app/pages/lockers/shared/locker.service';
import { CourtView } from '../../shared/lawsuit-model';
import { LawsuitService } from '../../shared/lawsuit.service';

@Component({
  selector: 'app-new-lawsuit',
  templateUrl: './new-lawsuit.component.html',
  styleUrls: ['./new-lawsuit.component.scss'],
})
export class NewLawsuitComponent implements OnInit {
  loading = false;
  lawSuitFormGroup: FormGroup;
  courts: CourtView[] = [];
  contacts: Contact[] = [];
  lockers: Locker[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewLawsuitComponent>,
    private lawsuitService: LawsuitService,
    private lockerService: LockerService,
    private contactService: ContactService,
    private toastr: ToastrService
  ) {
    this.lawSuitFormGroup = this.formBuilder.group({
      district: ['', [Validators.required]],
      court: ['', [Validators.required]],
      client: ['', [Validators.required]],
      locker: ['', [Validators.required]],
      code_number: ['', [Validators.required]],
      identifier: ['', [Validators.required]],
      descriptor: ['', [Validators.required]],
      observation: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCourts();
    this.getContacts();
    this.getLockers();
  }
  save(): void {
    if (this.lawSuitFormGroup.valid) {
      this.loading = true;
      this.lawsuitService
        .postLawSuits(this.lawSuitFormGroup.value)
        .subscribe(
          (LAWSUITS) => {},
          (error) => {
            this.toastr.error(
              'Houve algum problema inesperado, tente novamente mais tarde'
            );
          }
        )
        .add(() => {
          this.loading = false;
          this.dialogRef.close();
        });
    }
  }
  getCourts(): void {
    this.lawsuitService
      .getCourtList()
      .then((COURTLIST) => (this.courts = COURTLIST));
  }
  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((CONTATCS) => (this.contacts = CONTATCS));
  }
  getLockers(): void {
    this.lockerService
      .getLockers()
      .subscribe((LOCKERS) => (this.lockers = LOCKERS));
  }
}
