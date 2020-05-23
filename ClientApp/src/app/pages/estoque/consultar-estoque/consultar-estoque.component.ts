import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/app-service/estoque.service';
import { ActivatedRoute } from '@angular/router';
import { EstoqueProduto } from 'src/app/models/estoqueProduto';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalSucessoComponent } from 'src/app/modal/modal-sucesso/modal-sucesso.component';
import { ModalErroComponent } from 'src/app/modal/modal-erro/modal-erro.component';
import { ProdutoService } from 'src/app/app-service/produto.service';
import { Produto } from 'src/app/models/produto';
@Component({
  selector: 'app-consultar-estoque',
  templateUrl: './consultar-estoque.component.html',
  styleUrls: ['./consultar-estoque.component.css']
})
export class ConsultarEstoqueComponent implements OnInit {
  public idEstoque: any;
  public nomeEstoque: any;
  public produtos: any;
  public showProdutoSemEstoque = false;
  public produtosSemEstoque: Produto[];

  constructor(
    private _estoqueService: EstoqueService,
    private _produtoService: ProdutoService,
    private route: ActivatedRoute,
    public matDialog: MatDialog
  ) {
    this.idEstoque = this.route.snapshot.params.id;
    this.nomeEstoque = this.route.snapshot.params.nome;
    console.log('ID ESTOQUE: ', this.idEstoque);
    console.log('Nome ESTOQUE: ', this.nomeEstoque);
  }

  ngOnInit() {
    this.obterProdutosEstoque(+this.idEstoque);
  }
  public showProdutos() {
    if (!this.showProdutoSemEstoque) {
      this.showProdutoSemEstoque = true;
      this.produtoSemEstoque();
    } else {
      this.showProdutoSemEstoque = false;
      this.obterProdutosEstoque(+this.idEstoque);
    }
  }
  public obterProdutosEstoque(idEstoque: number) {
    this._estoqueService.obterProdutoEstoque(idEstoque).subscribe(
      result => {
        console.log('Retorno Produtos: ', result);
        this.produtos = result;
      }, erro => console.error(erro));
  }
  public produtoSemEstoque() {
    this._produtoService.obterProdutoSemEstoque().subscribe(
      response => {
        this.produtosSemEstoque = response;
        console.log('Retorno Produtos sem estoque: ', response);
      }, error => {
        console.log('Mensagem erro do banco: ', error);
        alert('Ocorreu um erro interno.');
      }
    );
  }
  public removerProdutoEstoque(idProduto) {
    const dados = new EstoqueProduto;
    dados.idEstoque = +this.idEstoque;
    dados.idProduto = idProduto;

    this._estoqueService.removerItem(dados).subscribe(
      resp => {
        console.log('retorno remoção: ', resp);
        if (resp) {
          this.openModalSucesso('O produto foi removido com sucesso!');
          this.obterProdutosEstoque(+this.idEstoque);
        } else {
          this.openModalErro('Ocorreu um erro ao apagar o produto informado.');
        }
      }, erro => {
        console.log(erro);
        alert('Ocorreu um erro interno.');
      });
  }
  public adicionarProdutoEstoque(idProduto: number) {
    const dadosEstoqueProduto = new EstoqueProduto;
    dadosEstoqueProduto.idEstoque = +this.idEstoque;
    dadosEstoqueProduto.idProduto = idProduto;

    console.log('retorno EstoqueProduto', dadosEstoqueProduto);

    this._estoqueService.adicionarItem(dadosEstoqueProduto).subscribe(
      resp => {
        console.log('retorno remoção: ', resp);
        if (resp) {
          this.openModalSucesso('Produto adicionado ao estoque!');
          this.produtoSemEstoque();
        } else {
          this.openModalErro('Ocorreu um erro ao adicionar o produto informado.');
        }
      }, erro => {
        console.log(erro);
        alert('Ocorreu um erro interno.');
      }
    );
  }
  public openModalSucesso(mensagem: string) {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = mensagem; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalSucessoComponent, config);
  }
  public openModalErro(mensagemErro: string) {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = mensagemErro; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalErroComponent, config);
  }
}
