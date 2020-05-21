import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProdutoService } from 'src/app/app-service/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  public idProduto: any;

  constructor(
    private route: ActivatedRoute,
    private _produtoService: ProdutoService,
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(resp => {
    //   this.idProduto = resp;
    // }, erro => console.log(erro));
    this.idProduto = this.route.snapshot.params.id;
    console.log('Retorno: ', this.idProduto);
  }
}
