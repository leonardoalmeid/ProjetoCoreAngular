import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  Usuarios: Usuario[] = [];
  tab: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get < Usuario[] > (baseUrl + 'api/Usuario').subscribe(result => {
      console.log('Retorno: ', result);
      this.Usuarios = result;
    }, error => console.error(error));
  }
  public Realizar(tipo: number) {
    this.tab = '1';
  }
}

interface Usuario {
  Id: number;
  Nome: string;
  Email: string;
}
