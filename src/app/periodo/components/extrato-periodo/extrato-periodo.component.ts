import { ValorPorUsuario } from './../../domain/valor-por-usuario-dto';
import { DespesaService } from 'src/app/despesa/service/despesa.service';
import { ActivatedRoute } from '@angular/router';
import { Periodo } from '../../domain/periodo';
import { PeriodoService } from './../../service/periodo.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-extrato-periodo',
  templateUrl: './extrato-periodo.component.html',
  styleUrls: ['./extrato-periodo.component.css'],
})
export class ExtratoPeriodoComponent {
  periodo?: Periodo;
  valoresPorUsuarioNoPeriodo: ValorPorUsuario[] = [];

  constructor(
    private route: ActivatedRoute,
    private periodoService: PeriodoService,
    private despesaService: DespesaService
  ) {}

  ngOnInit(): void {
    this.buscarPeriodo().subscribe((periodo) => {
      this.periodo = periodo as Periodo;
      let periodoId = this.periodo.id as number;
      return this.buscarValorPagoPorUsuarioNoPeriodo(periodoId);
    });
  }

  buscarPeriodo(): Observable<Periodo> {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    return this.periodoService.buscarPeriodo(id);
  }

  buscarValorPagoPorUsuarioNoPeriodo(periodoId: number) {
    this.despesaService
      .buscarValorPagoPorUsuarioNoPeriodo(periodoId)
      .subscribe((valores) => (this.valoresPorUsuarioNoPeriodo = valores));
  }
}
