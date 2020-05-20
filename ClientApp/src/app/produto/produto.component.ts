import { Component } from '@angular/core';

@Component({
  selector: 'app-produto-component',
  templateUrl: './produto.component.html'
})
export class ProdutoComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
