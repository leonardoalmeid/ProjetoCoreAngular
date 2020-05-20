import { Component } from '@angular/core';
import { ProdutoService } from '../app-service/produto.service';
import { error } from 'protractor';

@Component({
  selector: 'app-produto-component',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {
  public tab: number;
  public produtos: any;

  constructor(
    private _produtoService: ProdutoService
  ) {
    this.tab = 1;
    this._produtoService.obterProdutos().subscribe(result => {
        console.log('Retorno Produtos: ', result);
        this.produtos = result;
      }, erro => console.error(erro));
  }
}
