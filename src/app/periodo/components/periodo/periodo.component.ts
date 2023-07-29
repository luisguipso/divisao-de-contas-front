import { UsuarioService } from './../../../usuario/service/usuario.service';
import { PeriodoService } from './../../service/periodo.service';
import { Component } from '@angular/core';
import { Periodo } from '../../domain/periodo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Usuario } from 'src/app/usuario/domain/usuario';
import { USUARIOS } from 'src/app/usuario/mock-usuario';

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
  selectedItems: Usuario[] = [];
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
    this.setPeriodo();
    this.setUpDropDownDivisores();
  }

  getIdFromRouteParam() {
    this.idPeriodo = Number(this.route.snapshot.paramMap.get('id'));
  }

  setTitulo() {
    this.titulo = this.idPeriodo ? 'Editar Periodo' : 'Novo Periodo';
  }

  private setPeriodo() {
    if (this.idPeriodo) {
      this.buscarPeriodo(this.idPeriodo);
    } else {
      this.periodo = this.criarNovoPeriodo();
    }
  }

  private buscarPeriodo(id: number) {
    let periodoEncontrato: Periodo = this.criarNovoPeriodo();
    this.periodoService
      .buscarPeriodo(id)
      .subscribe((periodo) => (periodoEncontrato = periodo));

    if (periodoEncontrato) {
      this.periodo = periodoEncontrato;
      this.selectedItems = periodoEncontrato.divisores;
    }
  }

  private criarNovoPeriodo(): Periodo {
    return {
      id: 0,
      descricao: '',
      divisores: [],
      isFechado: false,
      valor: 0,
    };
  }

  setUpDropDownDivisores() {
    /*this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
    ];*/

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

  onItemSelect(item: any) {}
  onSelectAll(items: any) {
    this.selectedItems = items;
  }

  salvar() {
    if (this.periodo) {
      this.periodo.divisores = this.selectedItems;
    }
    console.log(this.periodo);
  }

  goBack() {
    this.location.back();
  }
}
