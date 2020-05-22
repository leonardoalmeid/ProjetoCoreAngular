import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-erro',
  templateUrl: './modal-erro.component.html',
  styleUrls: ['./modal-erro.component.css']
})
export class ModalErroComponent implements OnInit {
 public mensagemErro: string;

  constructor(
    public dialogRef: MatDialogRef<ModalErroComponent>
  ) { }

  ngOnInit() {
    this.mensagemErro = this.dialogRef.id;
  }
  public fecharModal() {
    this.dialogRef.close();
  }
}
