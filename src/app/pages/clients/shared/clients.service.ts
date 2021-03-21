import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/common/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { Client } from './clients-model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  apiUrl = environment.APIs.URL;
  isChecked = true;
  loadedClients: Client[] = [];
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getClients(): Observable<Client[]> {
    const response = this.httpClient.get<Client[]>(`${this.apiUrl}/clients/`);
    response.subscribe((clients) => (this.loadedClients = clients));
    return response;
  }
  getLoadedClients(): Observable<Client[]> {
    return of(this.loadedClients);
  }

  postClients(client: Client): Observable<Client> {
    client.company = this.storageService.currentUser.user.company.id;
    if (!client.whatsapp) {
      delete client.whatsapp;
    }
    if (!client.observation) {
      delete client.observation;
    }
    return this.httpClient
      .post<Client>(`${this.apiUrl}/clients/`, client)
      .pipe(take(1));
  }
  patchClients(client: Client): Observable<Client> {
    if (!client.whatsapp) {
      delete client.whatsapp;
    }
    if (!client.observation) {
      delete client.observation;
    }
    return this.httpClient
      .patch<Client>(`${this.apiUrl}/clients/${client.id}/`, client)
      .pipe(take(1));
  }
}
