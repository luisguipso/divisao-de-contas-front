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
  apiUrl = `${this.SERVER_URL}/v1/api/periodos`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  requestOptions: Object = {
    headers: this.headers,
    responseType: 'text',
  };
  constructor(private http: HttpClient) {}

  getPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.apiUrl);
  }

  buscarPeriodo(id: number): Observable<Periodo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Periodo>(url);
  }

  salvar(periodo: Periodo): Observable<any> {
    return this.http.post(this.apiUrl, periodo, this.requestOptions);
  }

  updatePeriodo(periodo: Periodo): Observable<any> {
    const url = `${this.apiUrl}/${periodo.id}`;
    return this.http.put(url, periodo, this.requestOptions);
  }
}
