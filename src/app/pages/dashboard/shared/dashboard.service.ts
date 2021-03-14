import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/common/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { DataTotal } from './dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiUrl = environment.APIs.URL;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getTotal(): Observable<DataTotal> {
    return this.httpClient.post<DataTotal>(`${this.apiUrl}/companies/total`, {
      company_id: this.storageService.currentUser.user.company.id,
    });
  }
}
