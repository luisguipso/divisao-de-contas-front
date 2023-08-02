import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Despesa } from '../domain/despesa';
import { DESPESAS } from '../despesa-mock';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from 'src/main';
import { ValorPorUsuario } from 'src/app/periodo/domain/valor-por-usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  apiUrl = API_URL + '/despesas';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  requestOptions: Object = {
    headers: this.headers,
  };
  requestOptionsReturnTypeText: Object = {
    ...this.requestOptions,
    responseType: 'text',
  };

  constructor(private http: HttpClient) {}

  getDespesasPorPeriodo(idPeriodo: Number): Observable<Despesa[]> {
    const requestOptionsWithParams = this.getRequestOptionsWithParam(
      'periodoId',
      idPeriodo.toString()
    );
    return this.http.get<Despesa[]>(
      `${this.apiUrl}/buscarPorPeriodo`,
      requestOptionsWithParams
    );
  }

  private getRequestOptionsWithParam(paramName: string, param: string) {
    const params = new HttpParams().set(paramName, param ? param : '');

    const requestOptionsWithParams = {
      ...this.requestOptions,
      params,
    };
    return requestOptionsWithParams;
  }

  getDespesa(id: number): Observable<Despesa> {
    return this.http.get<Despesa>(`${this.apiUrl}/${id}`);
  }

  buscarValorPagoPorUsuarioNoPeriodo(
    idPeriodo: number
  ): Observable<ValorPorUsuario[]> {
    let url: string = `${this.apiUrl}/buscarValorPagoPorUsuarioNoPeriodo`;
    const requestOptionsWithParams = this.getRequestOptionsWithParam(
      'periodoId',
      idPeriodo.toString()
    );
    return this.http.get<ValorPorUsuario[]>(url, requestOptionsWithParams);
  }

  salvarDespesa(despesa: Despesa): Observable<any> {
    return this.http.post(
      this.apiUrl,
      despesa,
      this.requestOptionsReturnTypeText
    );
  }

  atualizarDespesa(despesa: Despesa): Observable<any> {
    const url = `${this.apiUrl}/${despesa.id}`;
    return this.http.put(url, despesa, this.requestOptionsReturnTypeText);
  }
}
