import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']

})
export class DialogConfirmComponent implements OnInit {

  titulo!: string
  mensaje!: string
  datos!:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogConfirmComponent>,

  ) {
    this.datos=data
  }

  ngOnInit() {
    this.titulo=this.datos.titulo
    this.mensaje=this.datos.mensaje
  }
  confirm(){
    this.dialogRef.close(true)
  }

}
