import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = this.auth.getAuthorizationToken();
    console.log('interceptor token:' + authToken);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });

    return next.handle(authRequest);
  }
}
