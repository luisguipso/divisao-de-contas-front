import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Despesa } from '../domain/despesa';
import { DESPESAS } from '../despesa-mock';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  apiUrl = API_URL + '/despesas';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  requestOptions: Object = {
    headers: this.headers,
    responseType: 'text',
  };

  constructor(private http: HttpClient) {}

  getDespesasPorPeriodo(idPeriodo?: Number): Observable<Despesa[]> {
    return of(DESPESAS.filter((despesa) => despesa.periodo.id === idPeriodo));
  }

  getDespesa(id: number): Observable<Despesa> {
    const despesa = DESPESAS.find((despesa) => despesa.id === id);
    if (despesa) {
      return of(despesa);
    } else {
      throw new Error('not found');
    }
  }

  salvarDespesa(despesa: Despesa): Observable<any> {
    return this.http.post(this.apiUrl, despesa, this.requestOptions);
  }

  atualizarDespesa(despesa: Despesa): Observable<any> {
    const url = `${this.apiUrl}/${despesa.id}`;
    return this.http.put(url, despesa, this.requestOptions);
  }
}
