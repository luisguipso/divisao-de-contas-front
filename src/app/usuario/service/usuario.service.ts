import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { USUARIOS } from '../mock-usuario';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor() {}

  buscarUsuario(id: number): Observable<Usuario> {
    const usuario = USUARIOS.find((u) => u.id === id);
    if (usuario) {
      return of(usuario);
    } else {
      throw new Error('not found');
    }
  }
}
