import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodoService } from '../../service/periodo.service';
import { Periodo } from '../../domain/periodo';
import { DespesaService } from 'src/app/despesa/service/despesa.service';
import { Despesa } from 'src/app/despesa/domain/despesa';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo-details.component.html',
  styleUrls: ['./periodo-details.component.css'],
})
export class PeriodoDetailsComponent implements OnInit {
  @Input() periodo?: Periodo;
  despesas: Despesa[] = [];

  constructor(
    private route: ActivatedRoute,
    private periodoService: PeriodoService,
    private despesaService: DespesaService
  ) {}

  ngOnInit(): void {
    this.getPeriodo();
    this.getDespesas();
  }

  getPeriodo() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.periodoService
      .buscarPeriodo(id)
      .subscribe((periodo) => (this.periodo = periodo));
  }

  getDespesas() {
    if (this.periodo)
      this.despesaService
        .getDespesasPorPeriodo(this.periodo?.id)
        .subscribe((despesas) => (this.despesas = despesas));
  }
}
