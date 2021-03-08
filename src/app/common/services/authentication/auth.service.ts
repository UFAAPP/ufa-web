import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Credentials, RefreshToken, User } from './auth.models';

@Injectable()
export class AuthService {
  apiUrl = environment.APIs.URL;
  constructor(
    private router: Router,
    private storageService: StorageService,
    private httpClient: HttpClient
  ) {}

  getTokenExpirationDate(token: string): Date | null {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.storageService.token;
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date) {
      return !(date.valueOf() > new Date().valueOf());
    } else {
      return false;
    }
  }
  logout(): void {
    this.storageService.sessionStorageClear();
    this.router.navigateByUrl('/');
  }

  login(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/auth/`, credentials).pipe(
      map((user) => {
        if (user && user.access_token) {
          this.storageService.currentUser = user;
        }
        return user;
      })
    );
  }
  refreshToken(): Observable<any> {
    const data = {
      refresh_token: this.storageService.currentUser.refresh_token,
    };
    return this.httpClient.put<any>(`${this.apiUrl}/auth`, data).pipe(
      tap((token: RefreshToken) => {
        this.storeRefreshToken(token.access_token);
      })
    );
  }
  storeRefreshToken(token: string): void {
    let user = this.storageService.currentUser;
    user.access_token = token;
    this.storageService.currentUser = user;
  }
}
