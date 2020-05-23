import { Component } from '@angular/core';
import { ProdutoService } from '../../app-service/produto.service';
import { error } from 'protractor';
import { Produto } from '../../models/produto';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalSucessoComponent } from 'src/app/modal/modal-sucesso/modal-sucesso.component';
import { ModalErroComponent } from 'src/app/modal/modal-erro/modal-erro.component';
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
    public matDialog: MatDialog
  ) {
    this.obterProdutos();
    this.tab = 1;
  }
  ngOnint() {}
  public obterProdutos() {
    this._produtoService.obter().subscribe(result => {
      console.log('Retorno Produtos: ', result);
      this.produtos = result;
    }, erro => console.error(erro));
  }
  public removerProduto(idProduto: number) {
    this._produtoService.apagar(idProduto).subscribe(resp => {
      console.log('retorno remoção: ', resp);
      if (resp) {
        this.openModalSucesso();
        this.obterProdutos();
      } else {
        this.openModalErro();
      }
    }, erro => {
      console.log(erro);
      alert('Ocorreu um erro interno.');
    });
  }
  public openModalSucesso() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'O produto foi removido com sucesso!'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalSucessoComponent, config);
  }
  public openModalErro() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'Ocorreu um erro ao apagar o produto informado.'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalErroComponent, config);
  }
}
