import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { USUARIOS } from '../mock-usuario';
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
    /*const usuario = USUARIOS.find((u) => u.id === id);
    if (usuario) {
      return of(usuario);
    } else {
      throw new Error('not found');
    }*/

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
    //return of(USUARIOS);
    return this.http.get<Usuario[]>(`${this.usuariosApiUrl}`).pipe(
      tap((foundedUsers) => console.log(foundedUsers)),
      catchError(this.handleError<Usuario[]>('findAllUsers'))
    );
  }
}
