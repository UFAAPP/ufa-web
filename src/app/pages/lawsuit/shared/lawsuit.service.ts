import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { StorageService } from 'src/app/common/services/storage/storage.service';
import { Utils } from 'src/app/common/utils';
import { environment } from 'src/environments/environment';
import {
  COURTLIST,
  DISTRICTGROUPS,
  LAWSUITSTATUS,
  LAWSUITTYPES,
} from './lawsuit-mock';
import {
  DistrictGroup,
  LawSuit,
  LawSuitPost,
  SelectView,
} from './lawsuit-model';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  apiUrl = environment.APIs.URL;
  private fetch = new Subject<any>();
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private utils: Utils
  ) {}

  getLawSuits(): Observable<LawSuit[]> {
    return this.httpClient.get<LawSuit[]>(`${this.apiUrl}/lawsuit/`);
  }
  createLawSuits(lawsuit: LawSuitPost): Observable<LawSuitPost> {
    lawsuit.company = this.storageService.currentUser.user.company.id;
    return this.httpClient.post<LawSuitPost>(
      `${this.apiUrl}/lawsuit/`,
      lawsuit
    );
  }
  patchLawSuit(lawsuit: LawSuitPost): Observable<LawSuitPost> {
    return this.httpClient.patch<LawSuitPost>(
      `${this.apiUrl}/lawsuit/${lawsuit.id}/`,
      lawsuit
    );
  }
  getCourtList(): Promise<SelectView[]> {
    return Promise.resolve(COURTLIST);
  }
  getDistricts(): Observable<DistrictGroup[]> {
    return of(DISTRICTGROUPS);
  }
  getLawsuitTypes(): Observable<string[]> {
    return of(LAWSUITTYPES);
  }
  getLawsuitStatus(): Observable<SelectView[]> {
    return of(LAWSUITSTATUS);
  }
  sendFetchEvent() {
    this.fetch.next();
  }
  getFetchEvent(): Observable<any> {
    return this.fetch.asObservable();
  }
}
