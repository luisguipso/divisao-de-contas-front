import { Injectable } from '@angular/core';
import { Periodo } from '../domain/periodo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class PeriodoService {
  apiUrl = `${API_URL}/periodos`;
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

  salvarPeriodo(periodo: Periodo): Observable<any> {
    return this.http.post(this.apiUrl, periodo, this.requestOptions);
  }

  updatePeriodo(periodo: Periodo): Observable<any> {
    const url = `${this.apiUrl}/${periodo.id}`;
    return this.http.put(url, periodo, this.requestOptions);
  }
}
