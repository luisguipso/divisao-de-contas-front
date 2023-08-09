import { Injectable } from '@angular/core';
import { ValorPorUsuario } from '../domain/valor-por-usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class ExtratoPorUsuarioService {
  apiUrl = API_URL + '/extrato/usuario';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  requestOptions: Object = {
    headers: this.headers,
  };
  requestOptionsReturnTypeText: Object = {
    ...this.requestOptions,
    responseType: 'text',
  };

  constructor(private http: HttpClient) {}

  buscarValorPagoPorUsuarioNoPeriodo(
    periodoId: number
  ): Observable<ValorPorUsuario[]> {
    let url: string = `${this.apiUrl}/buscarValorPagoPorUsuarioNoPeriodo`;
    let requestOptionsWithParams = this.getRequestOptionsWithParam(
      'periodoId',
      periodoId.toString()
    );
    return this.http.get<ValorPorUsuario[]>(url, requestOptionsWithParams);
  }

  buscarValorDevidoPorUsuarioNoPeriodo(
    periodoId: number
  ): Observable<ValorPorUsuario[]> {
    let url: string = `${this.apiUrl}/buscarValorDevidoPorUsuarioNoPeriodo`;
    let requestOptionsWithParams = this.getRequestOptionsWithParam(
      'periodoId',
      periodoId.toString()
    );
    return this.http.get<ValorPorUsuario[]>(url, requestOptionsWithParams);
  }

  private getRequestOptionsWithParam(paramName: string, param: string) {
    let params = new HttpParams().set(paramName, param ? param : '');

    let requestOptionsWithParams = {
      ...this.requestOptions,
      params,
    };
    return requestOptionsWithParams;
  }
}
