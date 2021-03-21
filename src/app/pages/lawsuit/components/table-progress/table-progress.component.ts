import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LawSuit, LAWSUITMASK } from '../../shared/lawsuit-model';
import { LawsuitService } from '../../shared/lawsuit.service';
import { LawsuitDetailsModalComponent } from '../lawsuit-details-modal/lawsuit-details-modal.component';
import { LawsuitEditModalComponent } from '../lawsuit-edit-modal/lawsuit-edit-modal.component';

@Component({
  selector: 'app-table-progress',
  templateUrl: './table-progress.component.html',
  styleUrls: ['./table-progress.component.scss'],
})
export class TableProgressComponent implements OnInit, AfterViewInit {
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
  fetchEventsubscription: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private lawsuitService: LawsuitService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<LawSuit>();
    this.fetchEventsubscription = this.lawsuitService
      .getFetchEvent()
      .subscribe(() => {
        this.fetchTable();
      });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.fetchTable();
  }
  fetchTable() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.lawsuitService.getLawSuits();
        }),
        map((LAWSUITS) => {
          this.isLoadingResults = false;
          LAWSUITS = LAWSUITS.filter((lawsuit) =>
            lawsuit.status.match('PROGRESS')
          );
          this.length = LAWSUITS.length;
          this.hasData = LAWSUITS.length ? true : false;
          return LAWSUITS;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(
        (LAWSUITS) =>
          (this.dataSource = new MatTableDataSource<LawSuit>(LAWSUITS))
      );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openEditModel(lawsuit: LawSuit): void {
    const dialogRef = this.dialog.open(LawsuitEditModalComponent, {
      width: '600px',
      height: 'auto',
      data: lawsuit,
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => this.lawsuitService.sendFetchEvent());
    dialogRef.backdropClick().subscribe((_) => {
      this.lawsuitService.sendFetchEvent();
    });
  }
  openDetailModel(lawsuit: LawSuit): void {
    this.dialog.open(LawsuitDetailsModalComponent, {
      width: '50vw',
      height: 'auto',
      data: lawsuit,
    });
  }
}
