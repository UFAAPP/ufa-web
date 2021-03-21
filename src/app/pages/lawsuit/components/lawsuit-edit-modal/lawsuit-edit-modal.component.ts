import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Client } from 'src/app/pages/clients/shared/clients-model';
import { ClientService } from 'src/app/pages/clients/shared/clients.service';
import { Locker } from 'src/app/pages/lockers/shared/locker.model';
import { LockerService } from 'src/app/pages/lockers/shared/locker.service';
import {
  SelectView,
  DistrictGroup,
  LAWSUITMASK,
  LawSuit,
} from '../../shared/lawsuit-model';
import { LawsuitService } from '../../shared/lawsuit.service';
import {
  LawsuitNewModalComponent,
  _filter,
} from '../lawsuit-new-modal/lawsuit-new-modal.component';

@Component({
  selector: 'app-lawsuit-edit-modal',
  templateUrl: './lawsuit-edit-modal.component.html',
  styleUrls: ['./lawsuit-edit-modal.component.scss'],
})
export class LawsuitEditModalComponent implements OnInit {
  loading = false;
  lawSuitFormGroup: FormGroup;
  courts: SelectView[] = [];
  lawsuitStatus: SelectView[] = [];
  clients: Client[] = [];
  lawsuitTypes: string[] = [];
  districtGroup: DistrictGroup[];
  districtGroupOptions: Observable<DistrictGroup[]>;
  clientFilteredOptions: Observable<Client[]>;
  lawsuitMask = LAWSUITMASK;
  lockers: Locker[] = [];
  isDisabled = true;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LawsuitNewModalComponent>,
    private lawsuitService: LawsuitService,
    private clientService: ClientService,
    private lockerService: LockerService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public lawsuit: LawSuit
  ) {
    this.getDistrictGroups();
    this.getCourts();
    this.getClients();
    this.getLawsuitTypes();
    this.getLawsuitStatus();
    this.getLockers();

    this.lawSuitFormGroup = this.formBuilder.group({
      id: lawsuit.id,
      district: [
        { value: lawsuit.district, disabled: this.isDisabled },
        [Validators.required],
      ],
      court: [
        { value: lawsuit.court, disabled: this.isDisabled },
        [Validators.required],
      ],
      client: [
        { value: lawsuit.client.id, disabled: this.isDisabled },
        [Validators.required],
      ],
      locker: [
        { value: lawsuit.locker.id, disabled: this.isDisabled },
        [Validators.required],
      ],
      code_number: [
        { value: lawsuit.code_number, disabled: this.isDisabled },
        [Validators.required],
      ],
      descriptor: [
        { value: lawsuit.descriptor, disabled: this.isDisabled },
        [Validators.required],
      ],
      type: [
        { value: lawsuit.type, disabled: this.isDisabled },
        [Validators.required],
      ],
      status: [
        { value: lawsuit.status, disabled: this.isDisabled },
        [Validators.required],
      ],
      observation: [{ value: lawsuit.observation, disabled: this.isDisabled }],
    });
  }

  ngOnInit(): void {
    this.districtGroupOptions = this.lawSuitFormGroup
      .get('district')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterDistrictGroup(value))
      );
    this.clientFilteredOptions = this.lawSuitFormGroup
      .get('client')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this._filterClients(name) : this.clients.slice()))
      );
  }
  private _filterDistrictGroup(value: string): DistrictGroup[] {
    if (value) {
      return this.districtGroup
        .map((group) => ({
          state: group.state,
          districts: _filter(group.districts, value),
        }))
        .filter((group) => group.districts.length > 0);
    }

    return this.districtGroup;
  }
  private _filterClients(name: string): Client[] {
    return this.clients.filter((client) =>
      client.name.toLowerCase().match(name.toLocaleLowerCase())
    );
  }
  displayClient = (clientId: number) => {
    const client = this.clients.find((client) => client.id === clientId);
    return client && client.name ? client.name : '';
  };
  // if (this.clientFormGroup.dirty) {
  //   this.clientService
  //     .patchClients(this.clientFormGroup.value)
  //     .subscribe((CLIENTS) => {
  //       this.toastr.success('Contato adicionado com sucesso!');
  //       this.dialogRef.close();
  //     });
  // } else {
  //   this.dialogRef.close();
  // }

  save(): void {
    if (this.lawSuitFormGroup.dirty) {
      this.loading = true;
      this.lawsuitService
        .patchLawSuit(this.lawSuitFormGroup.value)
        .subscribe(
          (LAWSUITS) => this.toastr.success('Processo editado com sucesso!'),
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
  getClients(): void {
    this.clientService
      .getLoadedClients()
      .subscribe((CLIENTS) => (this.clients = CLIENTS));
  }

  getDistrictGroups(): void {
    this.lawsuitService
      .getDistricts()
      .subscribe((DISTRICTGROUPS) => (this.districtGroup = DISTRICTGROUPS));
  }
  getLawsuitTypes(): void {
    this.lawsuitService
      .getLawsuitTypes()
      .subscribe((LAWSUITTYPES) => (this.lawsuitTypes = LAWSUITTYPES));
  }
  getLawsuitStatus(): void {
    this.lawsuitService
      .getLawsuitStatus()
      .subscribe((LAWSUITSTATUS) => (this.lawsuitStatus = LAWSUITSTATUS));
  }
  getLockers(): void {
    this.lockerService.getLockers().subscribe((LOCKERS) => {
      this.lockers = LOCKERS.filter((locker) => !locker.full);
      if (this.lockers.length === 0) {
        this.toastr.warning('Não existem gavetas vazias');
      }
    });
  }
  editable(): void {
    this.isDisabled = false;
    this.lawSuitFormGroup.controls['district'].enable();
    this.lawSuitFormGroup.controls['court'].enable();
    this.lawSuitFormGroup.controls['client'].enable();
    this.lawSuitFormGroup.controls['locker'].enable();
    this.lawSuitFormGroup.controls['code_number'].enable();
    this.lawSuitFormGroup.controls['descriptor'].enable();
    this.lawSuitFormGroup.controls['type'].enable();
    this.lawSuitFormGroup.controls['status'].enable();
    this.lawSuitFormGroup.controls['observation'].enable();
  }
}
