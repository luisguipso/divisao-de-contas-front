import { PeriodoService } from './../../service/periodo.service';
import { Component } from '@angular/core';
import { Periodo } from '../../domain/periodo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
})
export class PeriodoComponent {
  periodo?: Periodo;
  titulo: string = '';
  idPeriodo?: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private PeriodoService: PeriodoService
  ) {}

  ngOnInit(): void {
    this.getIdFromRouteParam();
    this.setTitulo();
    this.setPeriodo();
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
      this.criarNovoPeriodo();
    }
  }

  private buscarPeriodo(id: number) {
    this.PeriodoService.buscarPeriodo(id).subscribe(
      (periodo) => (this.periodo = periodo)
    );
  }

  private criarNovoPeriodo() {
    this.periodo = {
      id: 0,
      descricao: '',
      divisores: [],
      isFechado: false,
      valor: 0,
    };
  }

  salvar() {
    console.log(this.periodo);
  }

  goBack() {
    this.location.back();
  }
}
