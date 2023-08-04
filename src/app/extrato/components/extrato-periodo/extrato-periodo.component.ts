import { DespesaService } from 'src/app/despesa/service/despesa.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Observable, combineLatest, forkJoin, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Periodo } from 'src/app/periodo/domain/periodo';
import { ValorPorUsuario } from '../../domain/valor-por-usuario-dto';
import { PeriodoService } from 'src/app/periodo/service/periodo.service';

@Component({
  selector: 'extrato-periodo',
  templateUrl: './extrato-periodo.component.html',
  styleUrls: ['./extrato-periodo.component.css'],
})
export class ExtratoPeriodoComponent {
  @Input() periodo?: Periodo;
  valoresPagos: ValorPorUsuario[] = [];
  valoresDevidos: ValorPorUsuario[] = [];
  valoresCalculados: ValorPorUsuario[] = [];

  constructor(private despesaService: DespesaService) {}

  ngOnInit(): void {
    if (this.periodo) this.handlePeriodoData(this.periodo);
  }

  handlePeriodoData(periodo: Periodo) {
    let periodoId = periodo.id as number;
    const valoresDevidos$ =
      this.buscarValorDevidoPorUsuarioNoPeriodo(periodoId);
    const valoresPagos$ = this.buscarValorPagoPorUsuarioNoPeriodo(periodoId);

    forkJoin([valoresDevidos$, valoresPagos$]).subscribe(
      ([valoresDevidos, valoresPagos]) => {
        this.valoresDevidos = valoresDevidos;
        this.valoresPagos = valoresPagos;
        this.valoresCalculados = valoresDevidos.map((valoresDevidos) =>
          this.getValorCalculado(valoresDevidos, valoresPagos)
        );
      }
    );
  }

  buscarValorPagoPorUsuarioNoPeriodo(
    periodoId: number
  ): Observable<ValorPorUsuario[]> {
    return this.despesaService.buscarValorPagoPorUsuarioNoPeriodo(periodoId);
  }

  buscarValorDevidoPorUsuarioNoPeriodo(
    periodoId: number
  ): Observable<ValorPorUsuario[]> {
    return this.despesaService.buscarValorDevidoPorUsuarioNoPeriodo(periodoId);
  }

  calcularValor(valoresDevidos: ValorPorUsuario[]): ValorPorUsuario[] {
    return valoresDevidos.map((valoresDevidos) =>
      this.getValorCalculado(valoresDevidos, this.valoresPagos)
    );
  }

  getValorCalculado(
    valorDevidoPeloUsuario: ValorPorUsuario,
    valoresPagos: ValorPorUsuario[]
  ): ValorPorUsuario {
    const pagoPeloUsuario = valoresPagos.find(
      (valorPagoPorUsuario: ValorPorUsuario) =>
        valorPagoPorUsuario.usuario.id === valorDevidoPeloUsuario.usuario.id
    );
    const valorCalculado: number = pagoPeloUsuario
      ? valorDevidoPeloUsuario.valorTotal - pagoPeloUsuario.valorTotal
      : valorDevidoPeloUsuario.valorTotal;
    return {
      usuario: valorDevidoPeloUsuario.usuario,
      valorTotal: valorCalculado,
    };
  }

  isNegativo(valor: number): boolean {
    return valor <= 0;
  }
}
