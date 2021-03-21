import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Client } from 'src/app/pages/clients/shared/clients-model';
import { ClientService } from 'src/app/pages/clients/shared/clients.service';
import { Locker } from 'src/app/pages/lockers/shared/locker.model';
import {
  DistrictGroup,
  LAWSUITMASK,
  SelectView
} from '../../shared/lawsuit-model';
import { LawsuitService } from '../../shared/lawsuit.service';

export const _filter = (opt: string[], filterValue: string): string[] => {
  return opt.filter((item) =>
    item.toLowerCase().match(filterValue.toLowerCase())
  );
};
@Component({
  selector: 'app-lawsuit-nnew-modal',
  templateUrl: './lawsuit-new-modal.component.html',
  styleUrls: ['./lawsuit-new-modal.component.scss'],
})
export class LawsuitNewModalComponent implements OnInit {
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
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LawsuitNewModalComponent>,
    private lawsuitService: LawsuitService,
    private clientService: ClientService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public lockers: Locker[]
  ) {
    this.lawSuitFormGroup = this.formBuilder.group({
      district: ['', [Validators.required]],
      court: ['IN', [Validators.required]],
      client: ['', [Validators.required]],
      locker: ['', [Validators.required]],
      code_number: ['', [Validators.required]],
      descriptor: ['', [Validators.required]],
      type: ['EXTRAJUDICIAL', [Validators.required]],
      status: ['PROGRESS', [Validators.required]],
      observation: null,
    });
  }

  ngOnInit(): void {
    this.getDistrictGroups();
    this.getCourts();
    this.getClients();
    this.getLawsuitTypes();
    this.getLawsuitStatus();
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
  private _filterClients(filterValue: string): Client[] {
    return this.clients.filter((client) =>
      client.name.toLowerCase().match(filterValue.toLocaleLowerCase())
    );
  }
  displayClient = (clientId: number) => {
    const client = this.clients.find((client) => client.id === clientId);
    return client && client.name ? client.name : '';
  };

  save(): void {
    if (this.lawSuitFormGroup.valid) {
      this.loading = true;
      this.lawsuitService
        .createLawSuits(this.lawSuitFormGroup.value)
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
  getClients(): void {
    this.clientService
      .getClients()
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
}
