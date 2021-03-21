import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClientDetailComponent } from 'src/app/pages/clients/components/client-detail/client-detail.component';
import { LockerService } from '../../shared/locker.service';

@Component({
  selector: 'app-new-locker',
  templateUrl: './new-locker.component.html',
  styleUrls: ['./new-locker.component.scss'],
})
export class NewLockerComponent implements OnInit {
  loading = false;
  lockerFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientDetailComponent>,
    private lockerService: LockerService,
    private toastr: ToastrService
  ) {
    this.lockerFormGroup = this.formBuilder.group({
      number: ['', [Validators.required]],
      full: false,
    });
  }

  ngOnInit(): void {}
  
  save(): void {
    if (this.lockerFormGroup.valid) {
      this.loading = true;
      this.lockerService
        .setLocker(this.lockerFormGroup.value)
        .subscribe(
          (LOCKER) => {},
          (error) => {
            console.log(error);
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
}
