import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../authentication/auth.models';

export enum StorageTypes {
  CURRENT_USER = 'current_user',
  TOKEN = 'token',
  REFRESH = 'refresh',
}
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storageTypes = StorageTypes;

  get token(): string {
    const result = sessionStorage.getItem(this.storageTypes.TOKEN);
    if (result) {
      return result;
    }
    return '';
  }
  set token(token: string) {
    sessionStorage.setItem(this.storageTypes.TOKEN, token);
  }
  get refreshToken(): string {
    const result = sessionStorage.getItem(this.storageTypes.REFRESH);
    if (result) {
      return result;
    }
    return '';
  }
  set refreshToken(refreshToken: string) {
    sessionStorage.setItem(this.storageTypes.REFRESH, refreshToken);
  }
  get currentUser(): User {
    const currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem(StorageTypes.CURRENT_USER)!)
    );
    return currentUserSubject.value;
  }
  set currentUser(user: User) {
    sessionStorage.setItem(StorageTypes.CURRENT_USER, JSON.stringify(user));
  }

  sessionStorageClear(): void {
    sessionStorage.clear();
  }
}
