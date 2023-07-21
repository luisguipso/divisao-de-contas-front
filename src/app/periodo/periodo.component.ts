import { Component, Input, OnInit } from '@angular/core';
import { Periodo } from './periodo';
import { ActivatedRoute } from '@angular/router';
import { PeriodoService } from '../periodo.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
})
export class PeriodoComponent implements OnInit {
  @Input() periodo?: Periodo;

  constructor(
    private route: ActivatedRoute,
    private periodoService: PeriodoService
  ) {}

  ngOnInit(): void {
    this.getPeriodo();
  }

  getPeriodo() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.periodoService
      .getPeriodo(id)
      .subscribe((periodo) => (this.periodo = periodo));
  }
}
