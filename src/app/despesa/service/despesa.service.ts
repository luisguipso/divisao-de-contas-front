import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Despesa } from '../domain/despesa';
import { DESPESAS } from '../despesa-mock';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  constructor() {}

  getDespesasPorPeriodo(idPeriodo: Number): Observable<Despesa[]> {
    return of(DESPESAS.filter((despesa) => despesa.periodo === idPeriodo));
  }

  getDespesa(id: number): Observable<Despesa> {
    const despesa = DESPESAS.find((despesa) => despesa.id === id);
    if (despesa) {
      return of(despesa);
    } else {
      throw new Error('not found');
    }
  }
}
