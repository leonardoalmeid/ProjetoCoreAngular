import { Component } from '@angular/core';
import { ProdutoService } from '../../app-service/produto.service';
import { error } from 'protractor';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-component',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {
  public tab: number;
  public produtos: Produto[];

  constructor(
    private _produtoService: ProdutoService
  ) {
    this._produtoService.obter().subscribe(result => {
      console.log('Retorno Produtos: ', result);
      this.produtos = result;
    }, erro => console.error(erro));
    this.tab = 1;
  }

  public opcao(opc): void {
    switch (opc) {
      case 1:
        this.tab = 1;
        break;
      case 2:
        this.tab = 2;
        break;
      case 3:
        this.tab = 3;
        break;
      default:
        this.tab = 1;
        break;
    }
  }
}
