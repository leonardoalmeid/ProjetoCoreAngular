import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/app-service/produto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Produto } from 'src/app/models/produto';
import { ModalSucessoComponent } from 'src/app/modal/modal-sucesso/modal-sucesso.component';
import { ModalErroComponent } from 'src/app/modal/modal-erro/modal-erro.component';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  public idProduto: any;
  public formularioProduto: FormGroup;
  public produtos: any;
  public produto: Produto;

  constructor(
    private route: ActivatedRoute,
    private _produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog
  ) {
    this.criarFormulario();
  }

  ngOnInit() {
    this.idProduto = this.route.snapshot.params.id;
    console.log('Retorno: ', this.idProduto);

    this._produtoService.obterProduto(this.idProduto).subscribe(resp => {
      if (resp) {
        this.produtos = resp;
        this.preencherFormulario();
        console.log('Retorno de um produto em especifico: ', resp);
      }
    }, erro => {alert('Ocorreu um erro interno'); console.log(erro); });
  }
  public criarFormulario() {
    this.formularioProduto = this.formBuilder.group({
      Id: ['', Validators.required],
      Nome: ['', Validators.required],
      Marca: ['', Validators.required],
      Categoria: ['', Validators.required],
      Modelo: ['', Validators.required],
      PrecoUnitario: ['', Validators.required],
      Quantidade: ['', Validators.required]
    });
  }
  public preencherFormulario() {
    this.produto = new Produto;
    this.produto = this.produtos[0];
    console.log(this.produto);

    this.formularioProduto.patchValue({
      Id: this.produto.id,
      Nome: this.produto.nome,
      Marca: this.produto.marca,
      Categoria: this.produto.categoria,
      Modelo: this.produto.modelo,
      PrecoUnitario: this.produto.precoUnitario,
      Quantidade: this.produto.quantidade
    });
  }
  public atualizarDados() {
    const produtoForm = this.formularioProduto.value;
    if (produtoForm) {
      this.produto = new Produto;
      this.produto.id = produtoForm.Id;
      this.produto.nome = produtoForm.Nome;
      this.produto.marca = produtoForm.Marca;
      this.produto.categoria = produtoForm.Categoria;
      this.produto.modelo = produtoForm.Modelo;
      this.produto.precoUnitario = produtoForm.PrecoUnitario;
      this.produto.quantidade = produtoForm.Quantidade;
    }

    this._produtoService.atualizar(this.produto).subscribe(resp => {
      console.log('Retorno Produto Atualizado: ', resp);
      if (resp) {
        this.openModalSucesso();
      } else {
        this.openModalErro();
      }
    }, erro => {console.log('Retorno Erro Atualizar Produto: ', erro); alert('Ocorreu um erro interno.'); });
  }
  public openModalSucesso() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'Produto atualizado com sucesso!'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalSucessoComponent, config);
  }
  public openModalErro() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'Ocorreu um erro ao atualizar o produto.'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalErroComponent, config);
  }
}
