import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/app-service/produto.service';
import { ModalSucessoComponent } from 'src/app/modal/modal-sucesso/modal-sucesso.component';



@NgModule({
  declarations: [
    ModalSucessoComponent
  ],
  imports: [
    CommonModule,
    MatDialog
  ],
  providers: [
    ProdutoService,
  ],
})
export class CadastrarProdutoModule { }
