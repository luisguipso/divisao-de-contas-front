import { UsuarioService } from './../../../usuario/service/usuario.service';
import { PeriodoService } from './../../service/periodo.service';
import { Component } from '@angular/core';
import { Periodo } from '../../domain/periodo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Usuario } from 'src/app/usuario/domain/usuario';
import { USUARIOS } from 'src/app/usuario/mock-usuario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
})
export class PeriodoComponent {
  periodo?: Periodo;
  titulo: string = '';
  idPeriodo?: number;

  dropdownList: Usuario[] = [];
  pagadoresSelected: Usuario[] = [];
  dropdownSettings: IDropdownSettings = {};

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
    this.setUpDropDownDivisores();
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
    } else {
      this.setPeriodo(this.criarNovoPeriodo());
    }
  }

  private setPeriodo(periodo: Periodo) {
    this.periodo = periodo;
    this.pagadoresSelected = periodo.pagadores;
  }

  private buscarPeriodo(id: number) {
    let periodoEncontrato: Periodo = this.criarNovoPeriodo();
    this.periodoService.buscarPeriodo(id).subscribe({
      next: (periodo) => this.setPeriodo(periodo),
      error: (error) => alert(error.message),
    });
  }

  private criarNovoPeriodo(): Periodo {
    return {
      id: 0,
      descricao: '',
      pagadores: [],
      isFechado: false,
      valorTotal: 0,
    };
  }

  setUpDropDownDivisores() {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => (this.dropdownList = usuarios));

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    if (this.periodo) this.periodo.pagadores = this.pagadoresSelected;
  }
  onSelectAll(items: any) {
    this.pagadoresSelected = items;
    if (this.periodo) this.periodo.pagadores = this.pagadoresSelected;
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
