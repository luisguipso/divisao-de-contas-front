import { DespesaService } from 'src/app/despesa/service/despesa.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Periodo } from 'src/app/periodo/domain/periodo';
import { ValorPorUsuario } from '../../domain/valor-por-usuario-dto';
import { PeriodoService } from 'src/app/periodo/service/periodo.service';

@Component({
  selector: 'app-extrato-periodo',
  templateUrl: './extrato-periodo.component.html',
  styleUrls: ['./extrato-periodo.component.css'],
})
export class ExtratoPeriodoComponent {
  periodo?: Periodo;
  valoresPagos: ValorPorUsuario[] = [];
  valoresDevidos: ValorPorUsuario[] = [];
  valoresCalculados: ValorPorUsuario[] = [];

  constructor(
    private route: ActivatedRoute,
    private periodoService: PeriodoService,
    private despesaService: DespesaService
  ) {}

  ngOnInit(): void {
    this.buscarPeriodo()
      .pipe(
        switchMap((periodo) => {
          this.periodo = periodo as Periodo;
          let periodoId = this.periodo.id as number;
          let valoresPagos$ =
            this.buscarValorPagoPorUsuarioNoPeriodo(periodoId);
          let valoresDevidos$ =
            this.buscarValorDevidoPorUsuarioNoPeriodo(periodoId);
          return combineLatest([valoresDevidos$, valoresPagos$]);
        }),
        tap(([valoresDevidos, valoresPagos]) => {
          this.valoresDevidos = valoresDevidos;
          this.valoresPagos = valoresPagos;
          this.valoresCalculados = valoresDevidos.map((valoresDevidos) =>
            this.getValorCalculado(valoresDevidos, valoresPagos)
          );
        })
      )
      .subscribe();
  }

  buscarPeriodo(): Observable<Periodo> {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    return this.periodoService.buscarPeriodo(id);
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
