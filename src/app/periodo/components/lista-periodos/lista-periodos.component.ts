import { Component, HostListener, OnInit } from '@angular/core';
import { Periodo } from '../../domain/periodo';
import { PeriodoService } from '../../service/periodo.service';

@Component({
  selector: 'app-lista-periodo',
  templateUrl: './lista-periodos.component.html',
  styleUrls: ['./lista-periodos.component.css'],
})
export class ListaPeriodosComponent implements OnInit {
  periodos: Periodo[] = [];
  page = 0;
  isLoading = false;

  constructor(private periodoService: PeriodoService) {}

  ngOnInit(): void {
    this.getPaginaDePeriodos();
  }

  getPaginaDePeriodos(): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.periodoService.getPeriodos(this.page, 10).subscribe((periodos) => {
      if (this.periodos.length === 0) this.periodos = periodos;
      else this.periodos.push(...periodos);
      this.isLoading = false;
    });
    this.page++;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this.getPaginaDePeriodos();
    }
  }
}
