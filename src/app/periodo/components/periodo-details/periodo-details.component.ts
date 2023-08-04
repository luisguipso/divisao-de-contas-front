import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodoService } from '../../service/periodo.service';
import { Periodo } from '../../domain/periodo';
import { DespesaService } from 'src/app/despesa/service/despesa.service';
import { Despesa } from 'src/app/despesa/domain/despesa';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo-details.component.html',
  styleUrls: ['./periodo-details.component.css'],
})
export class PeriodoDetailsComponent implements OnInit {
  periodo: Periodo = {
    descricao: '',
    pagadores: [],
    isFechado: false,
    valorTotal: 0,
  };
  despesas: Despesa[] = [];

  constructor(
    private route: ActivatedRoute,
    private periodoService: PeriodoService,
    private despesaService: DespesaService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPeriodo().subscribe((periodo) => {
      this.periodo = periodo;
      let periodoId = periodo.id as number;
      this.getDespesas(periodoId);
    });
  }

  getPeriodo(): Observable<Periodo> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.periodoService.buscarPeriodo(id);
  }

  getDespesas(periodoId: number) {
    this.despesaService
      .getDespesasPorPeriodo(periodoId)
      .subscribe((despesas) => {
        this.despesas = despesas as Despesa[];
      });
  }
}
