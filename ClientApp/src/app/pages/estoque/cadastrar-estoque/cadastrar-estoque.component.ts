import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EstoqueService } from 'src/app/app-service/estoque.service';
import { Estoque } from 'src/app/models/estoque';
import { ModalSucessoComponent } from 'src/app/modal/modal-sucesso/modal-sucesso.component';
import { ModalErroComponent } from 'src/app/modal/modal-erro/modal-erro.component';
@Component({
  selector: 'app-cadastrar-estoque',
  templateUrl: './cadastrar-estoque.component.html',
  styleUrls: ['./cadastrar-estoque.component.css']
})
export class CadastrarEstoqueComponent implements OnInit {
  public formularioEstoque: FormGroup;

  constructor(
    private _estoqueService: EstoqueService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog
  ) {
    this.criarFormulario();
  }

  ngOnInit() {}
  public criarFormulario() {
    this.formularioEstoque = this.formBuilder.group({
      NomeEstoque: ['', Validators.required]
    });
  }
  public enviarDados() {
    const dados = new Estoque;
    const formulario = this.formularioEstoque.value;
    dados.nome = formulario.NomeEstoque;

    this._estoqueService.adicionar(dados).subscribe(resp => {
      console.log('Dados novo estoque', resp);
      if (resp) {
        this.openModalSucesso();
      } else {
        this.openModalErro();
      }
    }, erro => {
      console.log('Retorno Erro Cadastro Estoque: ', erro);
      alert('Ocorreu um erro interno.');
    });
  }
  public openModalSucesso() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'Estoque criado com sucesso!'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalSucessoComponent, config);
  }
  public openModalErro() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'Ocorreu um erro ao criar um estoque.'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalErroComponent, config);
  }
}
