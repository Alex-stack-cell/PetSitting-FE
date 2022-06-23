import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let auth_tkn = localStorage.getItem('auth_tkn');
    if (auth_tkn != null) {
      let header = {
        Authorization: 'Bearer ' + auth_tkn,
      };
      request = request.clone({ setHeaders: header });
    }
    return next.handle(request);
  }
}
