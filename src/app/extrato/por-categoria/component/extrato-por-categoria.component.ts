import { ValorPorCategoria } from './../domain/valor-por-categoria';
import { Component, Input } from '@angular/core';
import { Periodo } from 'src/app/periodo/domain/periodo';
import { ExtratoPorCategoriaService } from '../service/extrato-por-categoria.service';
import { Usuario } from 'src/app/usuario/domain/usuario';
import { USUARIOS } from 'src/app/usuario/mock-usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'extrato-individual',
  templateUrl: './extrato-por-categoria.component.html',
  styleUrls: ['./extrato-por-categoria.component.css'],
})
export class ExtratoPorCategoriaComponent {
  @Input() periodo?: Periodo;
  valoresPorCategoria: ValorPorCategoria[] = [];
  usuarioLogado?: Usuario;
  valorTotal?: number;

  constructor(private extratoPorCategoriaService: ExtratoPorCategoriaService) {}

  ngOnInit() {
    this.getUsuarioLogado();
    this.handlePeriodoData();
  }

  getIdUsuarioLogado(): number {
    if (this.usuarioLogado && this.usuarioLogado.id)
      return this.usuarioLogado.id;
    else throw new Error('Usuário não identificado!');
  }

  getUsuarioLogado() {
    //TODO
    this.usuarioLogado = USUARIOS[1];
  }

  handlePeriodoData() {
    const valorTotalPorCategoria$ =
      this.getTotalPorCategoriaParaOUsuarioNoPeriodo();
    valorTotalPorCategoria$.subscribe((valoresPorCategoria) => {
      this.valoresPorCategoria = valoresPorCategoria;
      this.calcularValorTotal();
    });
  }

  getTotalPorCategoriaParaOUsuarioNoPeriodo(): Observable<ValorPorCategoria[]> {
    let usuarioId = this.getIdUsuarioLogado();
    if (!this.periodo || !this.periodo.id)
      throw new Error('Periodo não definido!');

    return this.extratoPorCategoriaService.buscarValorTotalPorCategoriaEUsuarioNoPeriodo(
      this.periodo.id,
      usuarioId
    );
  }

  calcularValorTotal() {
    const valorInicial = 0;
    this.valorTotal = this.valoresPorCategoria
      .map((cada) => cada.valorTotal)
      .reduce((acumulador, cadaValor) => acumulador + cadaValor, valorInicial);
  }
}
