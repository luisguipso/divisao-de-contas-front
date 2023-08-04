import { Component } from '@angular/core';
import { Usuario } from '../../domain/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  titulo: string = '';
  idUsuario?: number;
  usuario: Usuario = {
    nome: '',
    percentual: 0,
  };
  save$?: Subscription;
  fetch$?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.getIdFromRouteParam();
    this.setTitulo();
    this.setUsuario();
  }

  getIdFromRouteParam() {
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
  }

  setTitulo() {
    this.titulo = this.idUsuario ? 'Editar Usuario' : 'Novo Usuario';
  }

  setUsuario() {
    if (this.idUsuario) this.fetch$ = this.buscarUsuario(this.idUsuario);
  }

  buscarUsuario(id: number): Subscription {
    return this.usuarioService
      .buscarUsuario(id)
      .subscribe((usuario) => (this.usuario = usuario));
  }

  salvar() {
    if (!this.usuario) {
      console.log('empty user');
      return;
    }
    if (this.usuario.id) {
      this.save$ = this.updateUsuario(this.usuario);
    } else {
      this.save$ = this.salvarUsuario(this.usuario);
    }
  }

  salvarUsuario(usuario: Usuario): Subscription {
    return this.usuarioService
      .salvarUsuario(usuario)
      .subscribe(() => alert(`Pessoa (${usuario.nome}) salva com sucesso!`));
  }

  updateUsuario(usuario: Usuario): Subscription {
    return this.usuarioService
      .updateUsuario(usuario)
      .subscribe(() =>
        alert(`Pessoa (${usuario.nome}) atualizada com sucesso!`)
      );
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.save$?.unsubscribe();
    this.fetch$?.unsubscribe();
  }
}
