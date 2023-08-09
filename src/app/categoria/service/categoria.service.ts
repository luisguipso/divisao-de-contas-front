import { Injectable } from '@angular/core';
import { Categoria } from '../domain/categoria';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from 'src/main';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiUrl = API_URL + '/categorias';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  requestOptions: Object = {
    headers: this.headers,
  };
  requestOptionsReturnTypeText: Object = {
    ...this.requestOptions,
    responseType: 'text',
  };

  constructor(private http: HttpClient) {}

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  getCategorias(pagina: number, tamanho: number): Observable<Categoria[]> {
    let params = new HttpParams()
      .set('pagina', pagina ? pagina : '0')
      .set('tamanho', tamanho ? tamanho : '0');

    let requestWithPagableParams = {
      ...this.requestOptions,
      params,
    };
    return this.http.get<Categoria[]>(this.apiUrl, requestWithPagableParams);
  }

  salvarCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(
      this.apiUrl,
      categoria,
      this.requestOptionsReturnTypeText
    );
  }

  atualizarCategoria(categoria: Categoria): Observable<any> {
    const url = `${this.apiUrl}/${categoria.id}`;
    return this.http.put(url, categoria, this.requestOptionsReturnTypeText);
  }
}
