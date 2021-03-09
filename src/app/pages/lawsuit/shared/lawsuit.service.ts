import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/common/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { COURTLIST } from './lawsuit-mock';
import { CourtView, LawSuit } from './lawsuit-model';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  apiUrl = environment.APIs.URL;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getLawSuits(): Observable<LawSuit[]> {
    return this.httpClient.get<LawSuit[]>(`${this.apiUrl}/lawsuit/`);
  }
  postLawSuits(lawsuit: LawSuit): Observable<LawSuit> {
    lawsuit.company = this.storageService.currentUser.user.company.id;
    return this.httpClient.post<LawSuit>(`${this.apiUrl}/lawsuit/`, lawsuit);
  }
  getCourtList(): Promise<CourtView[]> {
    return Promise.resolve(COURTLIST);
  }
}
