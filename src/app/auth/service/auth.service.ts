import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/main';
import { LoginResponse } from '../domain/loginResponse';
import { catchError, map } from 'rxjs';
import { Usuario } from 'src/app/usuario/domain/usuario';
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
    return this.getAuthenticationData() ? true : false;
  }

  getAuthenticationData(): LoginResponse | undefined {
    let currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) return undefined;

    return JSON.parse(currentUserJson);
  }

  getUsuarioLogado(): Usuario {
    let currentUser = this.getAuthenticationData();
    if (!currentUser) throw new Error('Usuário não authenticado!');
    return currentUser.usuarioLogado;
  }

  getAuthorizationToken(): string {
    let current = this.getAuthenticationData();
    return current ? current.accessToken : '';
  }
}
