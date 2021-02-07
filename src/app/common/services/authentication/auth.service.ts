import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthService {
  constructor(private router: Router, private storageService: StorageService) {}

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
}
