import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LockerService } from '../lockers/shared/locker.service';
import { NewLawsuitComponent } from './components/new-lawsuit/new-lawsuit.component';
import { LawSuit, LAWSUITMASK } from './shared/lawsuit-model';
import { LawsuitService } from './shared/lawsuit.service';

@Component({
  selector: 'app-lawsuit',
  templateUrl: './lawsuit.component.html',
  styleUrls: ['./lawsuit.component.scss'],
})
export class LawsuitComponent implements OnInit {
  displayedColumns: string[] = [
    'code_number',
    'descriptor',
    'client',
    'locker',
    'actions',
  ];
  hasData = false;
  dataSourceProgress: MatTableDataSource<LawSuit>;
  dataSourceArchived: MatTableDataSource<LawSuit>;
  isLoadingResults = true;
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lawsuitMask = LAWSUITMASK;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private lawsuitService: LawsuitService,
    public dialog: MatDialog,
    private lockerService: LockerService,
    private toastr: ToastrService
  ) {
    this.dataSourceProgress = new MatTableDataSource<LawSuit>();
    this.dataSourceArchived = new MatTableDataSource<LawSuit>();
  }

  ngOnInit(): void {}
  openNew() {
    this.lockerService.getLockers().subscribe((LOCKERS) => {
      const lockers = LOCKERS.filter((locker) => !locker.full);
      if (lockers.length === 0) {
        this.toastr.warning(
          'É necessário criar uma gaveta ou mudar seu status para vazia',
          'Não existem gavetas vazias'
        );
      } else {
        const dialogRef = this.dialog.open(NewLawsuitComponent, {
          width: '600px',
          height: 'auto',
          data: lockers,
        });
        dialogRef
          .afterClosed()
          .subscribe((result) => this.lawsuitService.sendFetchEvent());
        dialogRef.backdropClick().subscribe((_) => {
          this.lawsuitService.sendFetchEvent();
        });
      }
    });
  }
}
