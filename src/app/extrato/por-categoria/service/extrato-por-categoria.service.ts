import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/main';
import { ValorPorCategoria } from '../domain/valor-por-categoria';

@Injectable({
  providedIn: 'root',
})
export class ExtratoPorCategoriaService {
  apiUrl = API_URL + '/extrato/categoria';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  requestOptions: Object = {
    headers: this.headers,
  };
  requestOptionsReturnTypeText: Object = {
    ...this.requestOptions,
    responseType: 'text',
  };

  constructor(private http: HttpClient) {}

  buscarValorTotalPorCategoriaEUsuarioNoPeriodo(
    periodoId: number,
    usuarioId: number
  ): Observable<ValorPorCategoria[]> {
    let url: string = `${this.apiUrl}/buscarValorTotalPorCategoriaEUsuarioNoPeriodo`;

    let params = new HttpParams()
      .set('periodoId', periodoId)
      .set('usuarioId', usuarioId);
    let requestOptionsWithParams = {
      ...this.requestOptions,
      params,
    };
    return this.http.get<ValorPorCategoria[]>(url, requestOptionsWithParams);
  }
}
