import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { ProdutoService } from './app-service/produto.service';
import { EstoqueService } from './app-service/estoque.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    InicioComponent,
    ProdutoComponent,
    EstoqueComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: InicioComponent, pathMatch: 'full' },
      { path: 'produto', component: ProdutoComponent },
      { path: 'estoque', component: EstoqueComponent },
    ])
  ],
  providers: [
    ProdutoService,
    EstoqueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
