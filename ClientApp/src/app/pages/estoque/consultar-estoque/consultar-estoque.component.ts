import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/app-service/estoque.service';
import { ActivatedRoute } from '@angular/router';
import { EstoqueProduto } from 'src/app/models/estoqueProduto';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalSucessoComponent } from 'src/app/modal/modal-sucesso/modal-sucesso.component';
import { ModalErroComponent } from 'src/app/modal/modal-erro/modal-erro.component';

@Component({
  selector: 'app-consultar-estoque',
  templateUrl: './consultar-estoque.component.html',
  styleUrls: ['./consultar-estoque.component.css']
})
export class ConsultarEstoqueComponent implements OnInit {
  public idEstoque: any;
  public nomeEstoque: any;
  public produtos: any;

  constructor(
    private _estoqueService: EstoqueService,
    private route: ActivatedRoute,
    public matDialog: MatDialog
  ) {
    this.idEstoque = this.route.snapshot.params.id;
    this.nomeEstoque = this.route.snapshot.params.nome;
  }

  ngOnInit() {
    this.obterProdutosEstoque(this.idEstoque);
  }
  public obterProdutosEstoque(idEstoque: number) {
    this._estoqueService.obterProdutoEstoque(idEstoque).subscribe(result => {
      console.log('Retorno Produtos: ', result);
      this.produtos = result;
    }, erro => console.error(erro));
  }
  public removerProdutoEstoque(idProduto) {
    const dados = new EstoqueProduto;
    dados.idEstoque = this.idEstoque;
    dados.idProduto = idProduto;
    this._estoqueService.removerItem(dados) .subscribe(resp => {
      console.log('retorno remoção: ', resp);
      if (resp) {
        this.openModalSucesso();
        this.obterProdutosEstoque(this.idEstoque);
      } else {
        this.openModalErro();
      }
    }, erro => {console.log(erro); alert('Ocorreu um erro interno.'); } );
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
