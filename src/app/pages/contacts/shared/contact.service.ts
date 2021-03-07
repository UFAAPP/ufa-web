import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CONTACTLIST } from './contacts-mock';
import { IContact } from './contacts-model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = environment.APIs.URL;
  constructor(private httpClient: HttpClient) {}

  // getContacts(): Observable<IContact[]> {
  //   return of(CONTACTLIST);
  // }
  getContacts(): Observable<IContact[]> {
    return this.httpClient.get<IContact[]>(`${this.apiUrl}/clients`);
  }
}
