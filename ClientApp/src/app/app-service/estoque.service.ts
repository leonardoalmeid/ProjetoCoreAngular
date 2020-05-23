import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estoque } from '../models/estoque';
import { EstoqueProduto } from '../models/estoqueProduto';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private API_URL: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  public obter(): Observable<Array<Estoque>> {
    const url = `${this.API_URL}Estoque`;
    const result = this.http.get<Estoque[]>(url);
    return result;
  }
  public adicionar(dados: Estoque): Observable<any> {
    const url = `${this.API_URL}Estoque/Cadastrar`;
    const result = this.http.post(url, dados);
    return result;
  }
  public removerItem(dados: EstoqueProduto): Observable<any> {
    const url = `${this.API_URL}Estoque/RemoverItem`;
    const result = this.http.post(url, dados);
    return result;
  }
  public removerEstoque(idEstoque: number): Observable<any> {
    const url = `${this.API_URL}Estoque/Remover/${idEstoque}`;
    const result = this.http.get(url);
    return result;
  }
  public obterProdutoEstoque(idEstoque: number): Observable<any> {
    const url = `${this.API_URL}Estoque/${idEstoque}`;
    const result = this.http.get(url);
    return result;
  }
}
