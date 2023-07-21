import { Injectable } from '@angular/core';
import { PERIODOS } from './periodo/mock-periodos';
import { Periodo } from './periodo/periodo';
import { Observable, catchError, of, throwError } from 'rxjs';

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
