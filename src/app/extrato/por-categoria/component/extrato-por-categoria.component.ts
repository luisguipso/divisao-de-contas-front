import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Periodo } from 'src/app/periodo/domain/periodo';
import { ValorPorCategoria } from '../domain/valor-por-categoria';
import { ExtratoPorCategoriaService } from '../service/extrato-por-categoria.service';
import { Usuario } from 'src/app/usuario/domain/usuario';
import { USUARIOS } from 'src/app/usuario/mock-usuario';

@Component({
  selector: 'extrato-individual',
  templateUrl: './extrato-por-categoria.component.html',
  styleUrls: ['./extrato-por-categoria.component.css'],
})
export class ExtratoPorCategoriaComponent {
  @Input() periodo?: Periodo;
  valoresPorCategoria: ValorPorCategoria[] = [];
  usuarioLogado?: Usuario;

  constructor(private extratoPorCategoriaService: ExtratoPorCategoriaService) {}

  ngOnInit() {
    this.getUsuarioLogado();
    this.getTotalPorCategoriaParaOUsuarioNoPeriodo();
  }

  getTotalPorCategoriaParaOUsuarioNoPeriodo() {
    let usuarioId = this.getIdUsuarioLogado();
    if (!this.periodo || !this.periodo.id)
      throw new Error('Periodo não definido!');

    this.extratoPorCategoriaService
      .buscarValorTotalPorCategoriaEUsuarioNoPeriodo(this.periodo.id, usuarioId)
      .subscribe(
        (valoresPorCategoria) =>
          (this.valoresPorCategoria = valoresPorCategoria)
      );
  }

  getIdUsuarioLogado(): number {
    if (this.usuarioLogado && this.usuarioLogado.id)
      return this.usuarioLogado.id;
    else throw new Error('usuário não identificado!');
  }

  getUsuarioLogado() {
    //TODO
    this.usuarioLogado = USUARIOS[1];
  }
}
