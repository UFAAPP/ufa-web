import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DATALAWSUIT } from './lawsuit-mock';
import { DataLawSuit } from './lawsuit-model';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  constructor() {}

  getLawSuits(): Observable<DataLawSuit> {
    return of(DATALAWSUIT);
  }

}
