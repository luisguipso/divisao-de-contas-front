import { UsuarioService } from './../../../usuario/service/usuario.service';
import { ValorPorUsuario } from './../../domain/valor-por-usuario-dto';
import { DespesaService } from 'src/app/despesa/service/despesa.service';
import { ActivatedRoute } from '@angular/router';
import { Periodo } from '../../domain/periodo';
import { PeriodoService } from './../../service/periodo.service';
import { Component } from '@angular/core';
import { Observable, forkJoin, of, switchMap } from 'rxjs';

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
    this.buscarPeriodo().subscribe((periodo) => {
      this.periodo = periodo as Periodo;
      let periodoId = this.periodo.id as number;
      this.buscarValorPagoPorUsuarioNoPeriodo(periodoId);
      this.buscarValorDevidoPorUsuarioNoPeriodo(periodoId);
      this.calcularValorDevido();
    });
  }

  buscarPeriodo(): Observable<Periodo> {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    return this.periodoService.buscarPeriodo(id);
  }

  buscarValorPagoPorUsuarioNoPeriodo(periodoId: number) {
    this.despesaService
      .buscarValorPagoPorUsuarioNoPeriodo(periodoId)
      .subscribe((valores) => (this.valoresPagos = valores));
  }

  buscarValorDevidoPorUsuarioNoPeriodo(periodoId: number) {
    this.despesaService
      .buscarValorDevidoPorUsuarioNoPeriodo(periodoId)
      .subscribe((valoresComPercentual) => {
        this.valoresDevidos = valoresComPercentual;
      });
  }

  calcularValorDevido(): void {
    this.valoresDevidos.forEach((valorDevidoPeloUsuario) => {
      let pagoPeloUsuario = this.valoresPagos.find(
        (valorPagoPorUsuario) =>
          valorPagoPorUsuario.usuario.id === valorDevidoPeloUsuario.usuario.id
      );
      if (pagoPeloUsuario) {
        let valorCalculado: number =
          valorDevidoPeloUsuario.valorTotal - pagoPeloUsuario.valorTotal;
        this.valoresCalculados.push({
          usuario: valorDevidoPeloUsuario.usuario,
          valorTotal: valorCalculado,
        });
      }
    });
  }
}
