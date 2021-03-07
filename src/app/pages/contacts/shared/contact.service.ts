import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/common/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { Contact } from './contacts-model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = environment.APIs.URL;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  // getContacts(): Observable<Contact[]> {
  //   return of(CONTACTLIST);
  // }
  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.apiUrl}/clients/`);
  }

  postContacts(contact: Contact): Observable<Contact> {
    contact.company = this.storageService.currentUser.user.company.id;
    return this.httpClient
      .post<Contact>(this.apiUrl + '/clients/', contact)
      .pipe(take(1));
  }
}
