import { Component, Input } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Periodo } from 'src/app/periodo/domain/periodo';
import { ValorPorUsuario } from '../domain/valor-por-usuario-dto';
import { ExtratoPorUsuarioService } from '../service/extrato-por-usuario.service';

@Component({
  selector: 'extrato-por-usuario',
  templateUrl: './extrato-por-usuario.component.html',
  styleUrls: ['./extrato-por-usuario.component.css'],
})
export class ExtratoPorUsuarioComponent {
  @Input() periodo?: Periodo;
  valoresPagos: ValorPorUsuario[] = [];
  valoresDevidos: ValorPorUsuario[] = [];
  valoresCalculados: ValorPorUsuario[] = [];

  constructor(private extratoService: ExtratoPorUsuarioService) {}

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
    return this.extratoService.buscarValorPagoPorUsuarioNoPeriodo(periodoId);
  }

  buscarValorDevidoPorUsuarioNoPeriodo(
    periodoId: number
  ): Observable<ValorPorUsuario[]> {
    return this.extratoService.buscarValorDevidoPorUsuarioNoPeriodo(periodoId);
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
