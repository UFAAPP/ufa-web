import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/common/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { Locker } from './locker.model';

@Injectable({
  providedIn: 'root',
})
export class LockerService {
  private apiUrl = environment.APIs.URL;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getLockers(): Observable<Locker[]> {
    return this.httpClient.get<Locker[]>(`${this.apiUrl}/locker/`);
  }
  setLocker(locker: Locker): Observable<Locker> {
    locker.company = this.storageService.currentUser.user.company.id;
    return this.httpClient.post<Locker>(`${this.apiUrl}/locker/`, locker);
  }
}
