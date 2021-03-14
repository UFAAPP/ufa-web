import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/common/services/storage/storage.service';
import { Utils } from 'src/app/common/utils';
import { environment } from 'src/environments/environment';
import { COURTLIST, DISTRICTGROUPS } from './lawsuit-mock';
import { CourtView, DistrictGroup, LawSuit } from './lawsuit-model';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  apiUrl = environment.APIs.URL;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private utils: Utils
  ) {}

  getLawSuits(): Observable<LawSuit[]> {
    return this.httpClient.get<LawSuit[]>(`${this.apiUrl}/lawsuit/`);
  }
  postLawSuits(lawsuit: LawSuit): Observable<LawSuit> {
    lawsuit.identifier = this.utils.getUniqueId(4);
    lawsuit.company = this.storageService.currentUser.user.company.id;
    return this.httpClient.post<LawSuit>(`${this.apiUrl}/lawsuit/`, lawsuit);
  }
  getCourtList(): Promise<CourtView[]> {
    return Promise.resolve(COURTLIST);
  }
  getDistricts(): Observable<DistrictGroup[]> {
    return of(DISTRICTGROUPS);
  }
}
