import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NewLawsuitComponent } from './components/new-lawsuit/new-lawsuit.component';
import { LawSuit, LAWSUITMASK } from './shared/lawsuit-model';
import { LawsuitService } from './shared/lawsuit.service';

@Component({
  selector: 'app-lawsuit',
  templateUrl: './lawsuit.component.html',
  styleUrls: ['./lawsuit.component.scss'],
})
export class LawsuitComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'code_number',
    'descriptor',
    'client',
    'locker',
    'actions',
  ];
  hasData = false;
  dataSource: MatTableDataSource<LawSuit>;
  isLoadingResults = true;
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lawsuitMask = LAWSUITMASK;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private lawsuitService: LawsuitService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<LawSuit>();
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.fetchTable();
    console.log(this.length);
  }
  fetchTable() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.lawsuitService.getLawSuits();
        }),
        map((LAWSUIT) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.length = LAWSUIT.length;
          this.hasData = LAWSUIT.length ? true : false;
          return LAWSUIT;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(
        (LAWSUIT) =>
          (this.dataSource = new MatTableDataSource<LawSuit>(LAWSUIT))
      );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openNew() {
    const dialogRef = this.dialog.open(NewLawsuitComponent, {
      width: '600px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => this.fetchTable());
    dialogRef.backdropClick().subscribe((_) => {
      this.fetchTable();
    });
  }
}
