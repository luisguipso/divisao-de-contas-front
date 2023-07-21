import { Injectable } from '@angular/core';
import { Periodo } from '../domain/periodo';
import { Observable, catchError, of, throwError } from 'rxjs';
import { PERIODOS } from '../mock-periodos';

@Injectable({
  providedIn: 'root',
})
export class PeriodoService {
  getPeriodos(): Observable<Periodo[]> {
    return of(PERIODOS);
  }

  getPeriodo(id: number): Observable<Periodo> {
    const periodo = PERIODOS.find((p) => p.id === id);
    if (periodo) {
      return of(periodo);
    } else {
      throw new Error('not found');
    }
  }

  constructor() {}
}
