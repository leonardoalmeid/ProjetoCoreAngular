import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../../app-service/estoque.service';
import { EstoqueComponent } from './estoque.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EstoqueComponent
  ],
  providers: [
    EstoqueService
  ],
})
export class EstoqueModule { }
