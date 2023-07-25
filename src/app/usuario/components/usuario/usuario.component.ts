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
    this.setId();
    this.setTitulo();
    this.setUsuario();
  }

  setId() {
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
  }

  setTitulo() {
    this.titulo = this.idUsuario ? 'Editar Usuario' : 'Novo Usuario';
  }

  private setUsuario() {
    if (this.idUsuario) {
      this.buscarPeriodo(this.idUsuario);
    } else {
      this.criarNovoPeriodo();
    }
  }

  private buscarPeriodo(id: number) {
    this.usuarioService
      .buscarUsuario(id)
      .subscribe((usuario) => (this.usuario = usuario));
  }

  private criarNovoPeriodo() {
    this.usuario = {
      nome: '',
      percentual: 0,
    };
  }

  salvar() {
    throw new Error('Method not implemented.');
  }
  goBack() {
    this.location.back();
  }
}
