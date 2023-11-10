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
  loginResponse?: LoginResponse;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log('username: ' + username + ' password: ' + password);
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    const options = {
      params,
      withCredentials: true,
    };

    return this.http.post<LoginResponse>(this.apiUrl, null, options).pipe(
      map((loginResponse) => {
        if (loginResponse) {
          this.loginResponse = loginResponse;
          localStorage.setItem('currentUser', JSON.stringify(loginResponse));
        }
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
