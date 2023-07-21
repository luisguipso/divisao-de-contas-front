import { Component, OnInit } from '@angular/core';
import { Periodo } from '../../domain/periodo';
import { PeriodoService } from '../../service/periodo.service';

@Component({
  selector: 'app-lista-periodo',
  templateUrl: './lista-periodos.component.html',
  styleUrls: ['./lista-periodos.component.css'],
})
export class ListaPeriodosComponent implements OnInit {
  periodos: Periodo[] = [];

  constructor(private periodoService: PeriodoService) {}

  ngOnInit(): void {
    this.getPeriodos();
  }

  getPeriodos(): void {
    this.periodoService
      .getPeriodos()
      .subscribe((periodos) => (this.periodos = periodos));
  }
}
