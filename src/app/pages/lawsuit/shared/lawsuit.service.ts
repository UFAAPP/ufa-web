import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LawSuit } from './lawsuit-model';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  apiUrl = environment.APIs.URL;
  constructor(private httpClient: HttpClient) {}

  getLawSuits(): Observable<LawSuit[]> {
    return this.httpClient.get<LawSuit[]>(`${this.apiUrl}/lawsuit/`);
  }
  postLawSuits(lawsuit: LawSuit): Observable<LawSuit> {
    return this.httpClient.post<LawSuit>(`${this.apiUrl}/lawsuit/`, lawsuit);
  }
}
