import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactDetailComponent } from 'src/app/pages/contacts/components/contact-detail/contact-detail.component';
import { LockerService } from '../../shared/locker.service';

@Component({
  selector: 'app-new-locker',
  templateUrl: './new-locker.component.html',
  styleUrls: ['./new-locker.component.scss'],
})
export class NewLockerComponent implements OnInit {
  loading = false;
  lockerFormGroup: FormGroup;
  color: ThemePalette = 'primary';
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ContactDetailComponent>,
    private lockerService: LockerService,
    private toastr: ToastrService
  ) {
    this.lockerFormGroup = this.formBuilder.group({
      number: ['', [Validators.required]],
      full: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {}
  save(): void {
    this.loading = true;
    this.lockerService
      .setLocker(this.lockerFormGroup.value)
      .subscribe(
        (LOCKER) => console.log(LOCKER),
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
