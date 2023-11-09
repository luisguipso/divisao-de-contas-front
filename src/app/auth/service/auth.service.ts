import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/main';
import { LoginResponse } from '../domain/loginResponse';
import { catchError, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = SERVER_URL + '/login';
  headers = new HttpHeaders().set(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  requestOptions: Object = {
    headers: this.headers,
  };
  loginResponse?: LoginResponse;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log('username: ' + username + ' password: ' + password);
    let params = new HttpParams()
      .set('username', username ? username : '')
      .set('password', password ? password : '');

    let requestWithPagableParams = {
      params,
    };

    var postData = '?username=' + username + '&password=' + password;
    return this.http
      .post<LoginResponse>(this.apiUrl + postData, requestWithPagableParams)
      .pipe(
        map((loginResponse) => {
          if (loginResponse) {
            this.loginResponse = loginResponse;
            localStorage.setItem('currentUser', JSON.stringify(loginResponse));
          }
        }),
        catchError((error) => {
          console.error(error.message);
          return error;
        })
      );
  }

  isLoggedIn() {
    return this.getCurrentUser() ? true : false;
  }

  getCurrentUser(): LoginResponse | undefined {
    let currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) return undefined;

    return JSON.parse(currentUserJson);
  }

  getAuthorizationToken(): string {
    let current = this.getCurrentUser();
    return current ? current.accessToken : '';
  }
}
