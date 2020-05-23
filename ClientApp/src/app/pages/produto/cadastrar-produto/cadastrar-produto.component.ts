import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/app-service/produto.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Produto } from 'src/app/models/produto';
import { ModalSucessoComponent } from 'src/app/modal/modal-sucesso/modal-sucesso.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalErroComponent } from 'src/app/modal/modal-erro/modal-erro.component';
@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {
  public formularioProduto: FormGroup;
  public dadosProduto: Produto;

  constructor(
    private _produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog
  ) {
    this.dadosProduto = new Produto;
  }

  ngOnInit() {
    this.criarFormulario();
  }
  public criarFormulario() {
    this.formularioProduto = this.formBuilder.group({
      inputNome: ['', Validators.required],
      inputMarca: ['', Validators.required],
      inputCategoria: ['', Validators.required],
      inputModelo: ['', Validators.required],
      inputPrecoUnitario: ['', Validators.required],
      inputQuantidade: ['', Validators.required]
    });
  }
  public enviarDados() {
    const produtoForm = this.formularioProduto.value;
    if (produtoForm) {
      this.dadosProduto.nome = produtoForm.inputNome;
      this.dadosProduto.marca = produtoForm.inputMarca;
      this.dadosProduto.categoria = produtoForm.inputCategoria;
      this.dadosProduto.modelo = produtoForm.inputModelo;
      this.dadosProduto.precoUnitario = produtoForm.inputPrecoUnitario;
      this.dadosProduto.quantidade = produtoForm.inputQuantidade;
    }

    this._produtoService.cadatrar(this.dadosProduto).subscribe(resp => {
      console.log('Retorno Cadastro Produto: ', resp);
      if (resp) {
        this.openModalSucesso();
      } else {
        this.openModalErro();
      }
    }, erro => {
      console.log('Retorno Erro Cadastro Produto: ', erro);
      alert('Ocorreu um erro interno.');
    });
  }
  public openModalSucesso() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'Cadastro realizado com sucesso!'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    config.ariaLabel = 'Cadastro realizado com sucesso';
    const modalDialog = this.matDialog.open(ModalSucessoComponent, config);
  }
  public openModalErro() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'Ocorreu um erro ao cadastrar o produto.'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalErroComponent, config);
  }
}
