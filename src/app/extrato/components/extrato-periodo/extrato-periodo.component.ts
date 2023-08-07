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
        this.calculaValoresDevidosDosUsuarios();
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

  calculaValoresDevidosDosUsuarios() {
    this.valoresCalculados = this.valoresPagos.map((valoresPagosPorUsuario) =>
      this.calculaValorDevido(valoresPagosPorUsuario, this.valoresDevidos)
    );
  }

  calculaValorDevido(
    valoresPagos: ValorPorUsuario,
    valoresDevidos: ValorPorUsuario[]
  ): ValorPorUsuario {
    let usuarioId: number = valoresPagos.usuario.id!;
    const devidoPeloUsuario = this.getValoresDevidosPeloUsuario(
      valoresDevidos,
      usuarioId
    );
    const valorCalculado: number = devidoPeloUsuario
      ? valoresPagos.valorTotal - devidoPeloUsuario.valorTotal
      : valoresPagos.valorTotal;
    return {
      usuario: valoresPagos.usuario,
      valorTotal: valorCalculado,
    };
  }

  private getValoresDevidosPeloUsuario(
    valoresDevidos: ValorPorUsuario[],
    usuarioId: number
  ) {
    return valoresDevidos.find(
      (valoresDevidosDoUsuario: ValorPorUsuario) =>
        valoresDevidosDoUsuario.usuario.id === usuarioId
    );
  }

  devePagar(valor: number): boolean {
    return valor <= 0;
  }

  getResultTextColor(valor: number): string {
    return this.devePagar(valor) ? 'text-danger' : 'text-success';
  }
}
