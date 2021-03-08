import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/authentication/auth.service';
import { environment } from 'src/environments/environment';
import { RefreshToken } from '../services/authentication/auth.models';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.storageService.currentUser;

    if (user && request.url.toString() !== `${environment.APIs.URL}/auth`) {
      const headers: any = {
        Authorization: `JWT ${user.access_token}`,
      };
      this.setDefaultHeaders(request, headers);
      request = request.clone({ setHeaders: headers });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handle403Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  setDefaultHeaders(request: HttpRequest<any>, headers: any): void {
    if (request.method === 'GET') {
      return;
    }
    headers['Content-Type'] = 'application/json';
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `JWT ${token}`,
      },
    });
  }
  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token: RefreshToken) => {
          this.isRefreshing = false;
          console.log(token.access_token)
          this.refreshTokenSubject.next(token.access_token);
          return next.handle(this.addToken(request, token.access_token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
