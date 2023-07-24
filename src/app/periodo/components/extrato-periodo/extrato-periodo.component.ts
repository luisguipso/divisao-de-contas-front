import { ActivatedRoute } from '@angular/router';
import { Periodo } from '../../domain/periodo';
import { PeriodoService } from './../../service/periodo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-extrato-periodo',
  templateUrl: './extrato-periodo.component.html',
  styleUrls: ['./extrato-periodo.component.css'],
})
export class ExtratoPeriodoComponent {
  periodo?: Periodo;
  constructor(
    private route: ActivatedRoute,
    private periodoService: PeriodoService
  ) {}

  ngOnInit(): void {
    this.buscarPeriodo();
  }

  buscarPeriodo() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (id)
      this.periodoService
        .buscarPeriodo(id)
        .subscribe((periodo) => (this.periodo = periodo));
  }
}
