import { UsuarioService } from './../../../usuario/service/usuario.service';
import { PeriodoService } from './../../service/periodo.service';
import { Component } from '@angular/core';
import { Periodo } from '../../domain/periodo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/usuario/domain/usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
})
export class PeriodoComponent {
  periodo: Periodo = {
    id: 0,
    descricao: '',
    pagadores: [],
    isFechado: false,
    valorTotal: 0,
  };
  titulo: string = '';
  idPeriodo?: number;

  usuarios: Usuario[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private periodoService: PeriodoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getIdFromRouteParam();
    this.setTitulo();
    this.getPeriodo();
    this.getUsuarios();
  }

  getIdFromRouteParam() {
    this.idPeriodo = Number(this.route.snapshot.paramMap.get('id'));
  }

  setTitulo() {
    this.titulo = this.idPeriodo ? 'Editar Periodo' : 'Novo Periodo';
  }

  private getPeriodo() {
    if (this.idPeriodo) {
      this.buscarPeriodo(this.idPeriodo);
    }
  }

  private setPeriodo(periodo: Periodo) {
    this.periodo = periodo;
  }

  private buscarPeriodo(id: number) {
    this.periodoService.buscarPeriodo(id).subscribe({
      next: (periodo) => this.setPeriodo(periodo),
      error: (error) => alert(error.message),
    });
  }

  getUsuarios() {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  salvar() {
    if (!this.periodo) {
      console.log('empty user');
      return;
    }
    if (this.periodo.id) {
      this.updatePeriodo(this.periodo);
    } else {
      this.salvarPeriodo(this.periodo);
    }
  }

  salvarPeriodo(periodo: Periodo) {
    this.periodoService.salvarPeriodo(periodo).subscribe({
      next: () => {
        alert(`Periodo (${periodo.descricao}) salvo com sucesso!`);
        this.goBack();
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  updatePeriodo(periodo: Periodo) {
    this.periodoService.updatePeriodo(periodo).subscribe({
      next: () => {
        alert(`Periodo (${periodo.descricao}) atualizado com sucesso!`);
        this.goBack();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
