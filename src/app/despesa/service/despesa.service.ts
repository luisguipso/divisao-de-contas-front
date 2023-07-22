import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Despesa } from '../domain/despesa';
import { DESPESAS } from '../despesa-mock';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  constructor() {}

  getDespesas(id: Number): Observable<Despesa[]> {
    return of(DESPESAS.filter((despesa) => despesa.periodo === id));
  }
}
