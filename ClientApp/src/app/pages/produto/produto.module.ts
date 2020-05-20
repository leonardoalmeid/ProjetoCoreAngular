import { ProdutoComponent } from './produto.component';

import { ProdutoService } from '../../app-service/produto.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProdutoComponent
  ],
  providers: [
    ProdutoService
  ],
})
export class ProdutoModule { }
