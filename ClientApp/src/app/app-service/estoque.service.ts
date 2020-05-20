import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estoque } from '../models/estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private API_URL: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  public obter(): Observable<Array<Estoque>> {
    const url = this.API_URL + 'Estoque';
    const result = this.http.get<Estoque[]>(url);
    return result;
  }
}
