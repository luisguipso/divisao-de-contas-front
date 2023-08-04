import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Periodo } from 'src/app/periodo/domain/periodo';
import { PeriodoService } from 'src/app/periodo/service/periodo.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css'],
})
export class ExtratoComponent {
  periodo?: Periodo;
  constructor(
    private route: ActivatedRoute,
    private periodoService: PeriodoService
  ) {}

  ngOnInit() {
    this.buscarPeriodo().subscribe((periodo) => (this.periodo = periodo));
  }

  buscarPeriodo(): Observable<Periodo> {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    return this.periodoService.buscarPeriodo(id);
  }
}
