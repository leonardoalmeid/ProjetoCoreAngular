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
    const url = this.API_URL + 'Produto';
    const result = this.http.get<Produto[]>(url);
    return result;
  }
}
