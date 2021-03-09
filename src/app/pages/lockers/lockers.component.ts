import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLockerComponent } from './components/new-locker/new-locker.component';
import { Locker } from './shared/locker.model';
import { LockerService } from './shared/locker.service';

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.scss'],
})
export class LockersComponent implements OnInit {
  color: ThemePalette = 'primary';
  lockersEmpty: Locker[] = [];
  lockersFull: Locker[] = [];
  constructor(public dialog: MatDialog, private lockerService: LockerService) {}

  ngOnInit(): void {
    this.getLockers();
  }

  openNew() {
    const dialogRef = this.dialog.open(NewLockerComponent, {
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => this.getLockers());
    dialogRef.backdropClick().subscribe((_) => {
      this.getLockers();
    });
  }
  getLockers(): void {
    this.lockerService.getLockers().subscribe((LOCKERS) => {
      this.lockersEmpty = LOCKERS.filter((locker) => !locker.full);
      this.lockersFull = LOCKERS.filter((locker) => locker.full);
    });
  }
}
