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
    private _produtoService: ProdutoService,
  ) {
    this._produtoService.obter().subscribe(result => {
      console.log('Retorno Produtos: ', result);
      this.produtos = result;
    }, erro => console.error(erro));
    this.tab = 1;
  }
  ngOnint() {}
}
