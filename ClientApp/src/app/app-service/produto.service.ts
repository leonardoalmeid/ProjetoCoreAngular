import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';

@Injectable()
export class ProdutoService {

  private API_URL: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  public obter(): Observable<Array<Produto>> {
    const url = `${this.API_URL}Produto`;
    const result = this.http.get<Produto[]>(url);
    return result;
  }
  public cadatrar(dados: Produto): Observable<any> {
    const url = `${this.API_URL}Produto/Cadastrar`;
    const result = this.http.post<Produto>(url, dados);
    return result;
  }
  public obterProduto(idProduto: number): Observable<any> {
    const url = `${this.API_URL}Produto/${idProduto}`;
    const result = this.http.get(url);
    return result;
  }
  public atualizar(dados: Produto): Observable<any> {
    const url = `${this.API_URL}Produto/Atualizar`;
    const result = this.http.put(url, dados);
    return result;
  }
  public apagar(idProduto: number): Observable<any> {
    const url = `${this.API_URL}Produto/Apagar/${idProduto}`;
    const result = this.http.get(url);
    return result;
  }
  public obterProdutoSemEstoque(): Observable<Array<Produto>> {
    const url = `${this.API_URL}Produto/ProdutoSemEstoque`;
    const result = this.http.get<Produto[]>(url);
    return result;
  }
}
