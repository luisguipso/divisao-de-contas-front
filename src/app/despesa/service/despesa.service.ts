import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despesa } from '../domain/despesa';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from 'src/main';

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
    let requestOptionsWithParams = this.getRequestOptionsWithParam(
      'periodoId',
      idPeriodo.toString()
    );
    return this.http.get<Despesa[]>(
      `${this.apiUrl}/buscarPorPeriodo`,
      requestOptionsWithParams
    );
  }

  private getRequestOptionsWithParam(paramName: string, param: string) {
    let params = new HttpParams().set(paramName, param ? param : '');

    let requestOptionsWithParams = {
      ...this.requestOptions,
      params,
    };
    return requestOptionsWithParams;
  }

  getDespesa(id: number): Observable<Despesa> {
    return this.http.get<Despesa>(`${this.apiUrl}/${id}`);
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
