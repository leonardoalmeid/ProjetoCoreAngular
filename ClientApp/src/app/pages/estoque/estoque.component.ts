import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstoqueService } from '../../app-service/estoque.service';
import { Estoque } from '../../models/estoque';
@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {
  tab: number;
  public estoques: Estoque[];

  constructor(
    private _estoqueService: EstoqueService
  ) {
    this._estoqueService.obter().subscribe(result => {
      console.log('Retorno Produtos: ', result);
      this.estoques = result;
    }, erro => console.error(erro));
    this.tab = 1;
  }
}
