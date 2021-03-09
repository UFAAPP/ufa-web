import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LawSuit } from './shared/lawsuit-model';
import { LawsuitService } from './shared/lawsuit.service';

@Component({
  selector: 'app-lawsuit',
  templateUrl: './lawsuit.component.html',
  styleUrls: ['./lawsuit.component.scss'],
})
export class LawsuitComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'district',
    'court',
    'code_number',
    'client',
    'descriptor',
    'locker',
    'actions',
  ];

  dataSource: MatTableDataSource<LawSuit>;
  resultsLength = 0;
  isLoadingResults = true;
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private lawsuitService: LawsuitService) {
    this.dataSource = new MatTableDataSource<LawSuit>();
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
        map((LAWSUIT) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = LAWSUIT.length;

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
}
