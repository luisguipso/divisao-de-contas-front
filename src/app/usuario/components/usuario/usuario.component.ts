import { Component } from '@angular/core';
import { Usuario } from '../../domain/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  titulo: string = '';
  idUsuario?: number;
  usuario?: Usuario;

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

  private setUsuario() {
    if (this.idUsuario) {
      this.buscarUsuario(this.idUsuario);
    } else {
      this.criarNovoUsuario();
    }
  }

  private buscarUsuario(id: number) {
    this.usuarioService
      .buscarUsuario(id)
      .subscribe((usuario) => (this.usuario = usuario));
  }

  private criarNovoUsuario() {
    this.usuario = {
      nome: '',
      percentual: 0,
    };
  }

  salvar() {
    if (!this.usuario) {
      console.log('empty user');
      return;
    }
    if (this.usuario.id) {
      this.updateUsuario(this.usuario);
    } else {
      this.salvarUsuario(this.usuario);
    }
  }

  salvarUsuario(usuario: Usuario) {
    this.usuarioService.salvarUsuario(usuario).subscribe(
      (_) => alert(`Pessoa (${this.usuario?.nome}) salva com sucesso!`),
      (error) => alert(error)
    );
  }

  updateUsuario(usuario: Usuario) {
    this.usuarioService.updateUsuario(usuario).subscribe(
      (_) => alert(`Pessoa (${this.usuario?.nome}) atualizada com sucesso!`),
      (error) => alert(error)
    );
  }

  goBack() {
    this.location.back();
  }
}
