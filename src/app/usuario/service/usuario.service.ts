import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Usuario } from '../domain/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  SERVER_URL = 'http://localhost:8080';
  private usuariosApiUrl = `${this.SERVER_URL}/v1/api/pessoas`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.usuariosApiUrl}/${id}`).pipe(
      tap((foundedUser) => console.log(foundedUser)),
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
      tap((foundedUsers) => console.log(foundedUsers)),
      catchError(this.handleError<Usuario[]>('findAllUsers'))
    );
  }

  salvarUsuario(usuario: Usuario): Observable<any> {
    return this.http
      .post(`${this.usuariosApiUrl}`, usuario)
      .pipe(tap((response) => console.log(response)));
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http
      .put(`${this.usuariosApiUrl}/${usuario.id}`, usuario)
      .pipe(tap((response) => console.log(response)));
  }
}
