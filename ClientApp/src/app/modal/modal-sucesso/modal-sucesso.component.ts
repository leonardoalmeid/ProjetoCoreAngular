import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-sucesso',
  templateUrl: './modal-sucesso.component.html',
  styleUrls: ['./modal-sucesso.component.css']
})
export class ModalSucessoComponent implements OnInit {
  public mensagemSucesso: string;

  constructor(
    public dialogRef: MatDialogRef<ModalSucessoComponent>
  ) { }

  ngOnInit() {
    this.mensagemSucesso = this.dialogRef.id;
  }

  // alerta() {
  //   alert("Você deseja mesmo cadastrar?");
  //   this.fecharModal();
  // }
  public fecharModal() {
    this.dialogRef.close();
  }
}
