import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ILawSuit } from './shared/lawsuit-model';
import { LawsuitService } from './shared/lawsuit.service';

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private httpClient: HttpClient) {}

  getRepoIssues(
    sort: string,
    order: string,
    page: number
  ): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    return this.httpClient.get<GithubApi>(requestUrl);
  }
}

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
    'identifier',
    'locker',
    'actions'
  ];

  dataSource: MatTableDataSource<ILawSuit>;
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private lawsuitService: LawsuitService) {
    this.dataSource = new MatTableDataSource<ILawSuit>();
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
        map((DATALAWSUIT) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = DATALAWSUIT.count;

          return DATALAWSUIT.resultus;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((LAWSUITSLIST) => (this.dataSource = new MatTableDataSource<ILawSuit>(LAWSUITSLIST)));
  }
}
