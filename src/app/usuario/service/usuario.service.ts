import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Usuario } from '../domain/usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuariosApiUrl = `${API_URL}/pessoas`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  requestOptions: Object = {
    headers: this.headers,
  };
  requestOptionsReturnTypeText: Object = {
    ...this.requestOptions,
    responseType: 'text',
  };

  constructor(private http: HttpClient) {}

  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.usuariosApiUrl}/${id}`).pipe(
      tap(() => {}),
      catchError(this.handleError<Usuario>('findUserById'))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(message);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.usuariosApiUrl}`).pipe(
      tap(() => {}),
      catchError(this.handleError<Usuario[]>('findAllUsers'))
    );
  }

  salvarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(
      `${this.usuariosApiUrl}`,
      usuario,
      this.requestOptionsReturnTypeText
    );
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(
      `${this.usuariosApiUrl}/${usuario.id}`,
      usuario,
      this.requestOptionsReturnTypeText
    );
  }
}
