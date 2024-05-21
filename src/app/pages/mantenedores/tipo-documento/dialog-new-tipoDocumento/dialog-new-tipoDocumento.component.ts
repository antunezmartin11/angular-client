import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { TipoDocumentoService } from '@app/services/backend/TipoDocumento.service';
import { TipoDocumentoRequest } from '@app/models/backend/maestros/clases-maestro';

@Component({
  selector: 'app-dialog-new-tipoDocumento',
  templateUrl: './dialog-new-tipoDocumento.component.html',
  styleUrls: ['./dialog-new-tipoDocumento.component.css'],

})
export class DialogNewTipoDocumentoComponent implements OnInit {

  formRegistro!: FormGroup
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  dataEditar: any;
  esEditar:boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private tipoDocumentoService: TipoDocumentoService,
    private dialogRef: MatDialogRef<DialogNewTipoDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if(data){
        this.dataEditar=data
      }
    }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit() {
    this.init()
    console.log(this.dataEditar)
    if(this.dataEditar!=undefined){
      this.esEditar=true
      let form = this.formRegistro
      form.controls['nombre'].setValue(this.dataEditar.nombre)
      form.controls['abreviatura'].setValue(this.dataEditar.abreviatura)
      form.controls['estado'].setValue(this.dataEditar.estado+"")
    }

  }

  init(){
    this.formRegistro = new FormGroup({
      nombre: new FormControl(null,[Validators.required]),
      abreviatura:new FormControl(null,[Validators.required]),
      estado:new FormControl(null,[Validators.required])
    })
  }

  registrar(){
    let form= this.formRegistro
    form.markAllAsTouched()
    if(form.valid){
      console.log(form.value)
      this.tipoDocumentoService.agregarTipoDocumentos(form.value).subscribe(
        {
          next: (data:any)=>{
            console.log(data)
            if(data.codigo=='201'){
              this.dialogRef.close(data)
            }
          }
        }
      )
    }else{
      console.log('no esta completo el formulario')
    }

  }

  modificarTipoDocumento(){
    let form = this.formRegistro
    form.markAllAsTouched()
    if(form.valid){
      let tipoDoc: TipoDocumentoRequest = new TipoDocumentoRequest;

      tipoDoc.id=this.dataEditar.id
      tipoDoc.abreviatura = form.controls['abreviatura'].value
      tipoDoc.nombre=form.controls['nombre'].value
      tipoDoc.estado=form.controls['estado'].value
      tipoDoc.eliminado=false

      this.tipoDocumentoService.updateTipoDocumentos(tipoDoc).subscribe({
        next: (data:any)=>{
          console.log(data)
          if(data.codigo=='200'){
            this.dialogRef.close(data)
          }
        }
      })
    }
  }
}
