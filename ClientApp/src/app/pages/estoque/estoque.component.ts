import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstoqueService } from '../../app-service/estoque.service';
import { Estoque } from '../../models/estoque';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalSucessoComponent } from 'src/app/modal/modal-sucesso/modal-sucesso.component';
import { ModalErroComponent } from 'src/app/modal/modal-erro/modal-erro.component';
@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {
  public estoques: Estoque[];

  constructor(
    private _estoqueService: EstoqueService,
    public matDialog: MatDialog
  ) {
    this.obterEstoque();
  }
  ngOninit() {}
  public obterEstoque() {
    this._estoqueService.obter().subscribe(result => {
      console.log('Retorno Estoques: ', result);
      if (result) {
        this.estoques = result;
      }
    }, erro => {
      console.error(erro);
      alert('Ocorreu um erro interno.');
    });
  }
  public removerEstoque(idEstoque: number) {
    this._estoqueService.removerEstoque(idEstoque).subscribe(resp => {
      console.log('retorno remoção estoque: ', resp);
      if (resp) {
        this.openModalSucesso();
        this.obterEstoque();
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
    config.id = 'Estoque removido com sucesso!'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalSucessoComponent, config);
  }
  public openModalErro() {
    const config = new MatDialogConfig();
    config.disableClose = true; // se o usuário clicar fora do modal, ele não será fechado
    config.id = 'Ocorreu um erro ao apagar estoque.'; // um ID para o qual a caixa de diálogo será conhecida
    config.height = '250px'; // altura modal
    config.width = '600px'; // largura da caixa modal
    const modalDialog = this.matDialog.open(ModalErroComponent, config);
  }
}
