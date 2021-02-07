import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.storageService.currentUser;
    const urlRequest = request.url;
    if (user && urlRequest.indexOf(environment.APIs.URL) !== -1) {
      const headers: any = {
        Authorization: user.access_token,
        'Content-Type': 'application/json',
      };
      this.setDefaultHeaders(request, headers);
      request = request.clone({ setHeaders: headers });
    }
    return next.handle(request);
  }

  setDefaultHeaders(request: HttpRequest<any>, headers: any): void {
    if (request.headers.has('Content-Type') || request.method === 'GET') {
      return;
    }
    headers['Content-Type'] = 'application/json';
  }
}
