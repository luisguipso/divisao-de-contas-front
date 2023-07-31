import { Injectable } from '@angular/core';
import { Periodo } from '../domain/periodo';
import { Observable, catchError, of, tap } from 'rxjs';
import { PERIODOS } from '../mock-periodos';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeriodoService {
  SERVER_URL = 'http://localhost:8080';
  apiUrl = `${this.SERVER_URL}/api/v1/periodos`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPeriodos(): Observable<Periodo[]> {
    return of(PERIODOS);
  }

  buscarPeriodo(id: number): Observable<Periodo> {
    const periodo = PERIODOS.find((p) => p.id === id);
    if (periodo) {
      return of(periodo);
    } else {
      throw new Error('not found');
    }
  }

  salvar(periodo: Periodo): Observable<String> {
    return this.http.post<Periodo>(this.apiUrl, periodo, this.httpOptions).pipe(
      tap((s) => this.log(`periodo salvo ${s.id}`)),
      catchError(this.handleError<any>('salvar periodo'))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
