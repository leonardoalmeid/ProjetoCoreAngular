import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  Usuarios: Usuario[] = [];
  tab: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Usuario[]>(baseUrl + 'api/Usuario').subscribe(result => {
      console.log("Retorno: ", result);
      this.Usuarios = result;
    }, error => console.error(error));
  }
  public CadastrarProduto(){
    this.tab = "1";
  }
  public ConsultarProduto(){
    this.tab = "2";
  }
  public EditarProduto(){
    this.tab = "3";
  }
  public AdicionarItemEstoque(){
    this.tab = "4";
  }
  public RemoverItemEstoque(){
    this.tab = "5";
  }
}

interface Usuario {
  Id: number;
  Nome: string;
  Email: string;
}

