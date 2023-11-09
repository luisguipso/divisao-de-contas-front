import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = this.auth.getAuthorizationToken();
    const authRequest = this.addAuthTokenToRequest(req, authToken);

    return next.handle(authRequest).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        },
      })
    );
  }

  private addAuthTokenToRequest(req: HttpRequest<any>, authToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (this.isUnauthorizedOrForbiden(error)) this.router.navigate(['/login']);
  }

  private isUnauthorizedOrForbiden(error: HttpErrorResponse) {
    return error.status === 401 || error.status === 403;
  }
}
