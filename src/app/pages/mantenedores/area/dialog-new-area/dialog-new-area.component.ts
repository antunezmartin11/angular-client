import { filter } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogNewTipoDocumentoComponent } from '../../tipo-documento/dialog-new-tipoDocumento/dialog-new-tipoDocumento.component';
import { FloatLabelType } from '@angular/material/form-field';
import { AreaRequest, GradoRequest } from '@app/models/backend/maestros/clases-maestro';
import { GradoService } from '@app/services/backend/grado.service';
import { AreaService } from '@app/services/backend/area.service';

@Component({
  selector: 'app-dialog-new-area',
  templateUrl: './dialog-new-area.component.html',
  styleUrls: ['./dialog-new-area.component.css']
})
export class DialogNewAreaComponent implements OnInit {

  formRegistro!: FormGroup
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  dataEditar: any;
  esEditar:boolean = false;
  listaGrados:any[]=[];
  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogNewTipoDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gradoService: GradoService,
    private areaService: AreaService

  ) {
    if(data){
      this.dataEditar=data
      this.esEditar=true
    }
  }

  ngOnInit() {
    console.log(this.dataEditar)
    this.init()
    this.obtenerListaGrados()
    if(this.dataEditar!=undefined){
      this.cargarDataEditar()
    }
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  cargarDataEditar(){
    let form = this.formRegistro
    form.controls['nombre'].setValue(this.dataEditar.nombre)
    form.controls['descripcion'].setValue(this.dataEditar.descripcion)
    form.controls['estado'].setValue(this.dataEditar.estado+'')
    form.controls['horas'].setValue(this.dataEditar.horas)
    console.log(this.dataEditar.grado != null ? this.dataEditar.grado.id : null)
    form.controls['grado'].setValue(this.dataEditar.grado != null ? this.dataEditar.grado.id+'' : null)
  }
  init(){
    this.formRegistro = new FormGroup({
      nombre: new FormControl(null,[Validators.required]),
      descripcion:new FormControl(null,[Validators.required]),
      estado:new FormControl(null,[Validators.required]),
      grado:new FormControl(null,[Validators.required]),
      horas:new FormControl(null,[Validators.required])
    })
  }

  obtenerListaGrados(){
    let listaGrado: GradoRequest = new GradoRequest
    this.gradoService.listarGrado().subscribe(
      {
        next: (data:any)=>{
          console.log(data)
          this.listaGrados=data.data
        }
      }
    )
  }
  registrarArea(){
    let request: AreaRequest = new AreaRequest
    let form = this.formRegistro
    request.nombre=form.controls['nombre'].value
    request.descripcion=form.controls['descripcion'].value
    request.estado=form.controls['estado'].value
    request.horas=form.controls['horas'].value
    request.grado.id=form.controls['grado'].value
    let grado = this.listaGrados.filter(x => x.id = form.controls['grado'].value)
    console.log(grado)
    console.log(request)
    this.areaService.registrarAreas(request).subscribe({
      next: (data:any)=>{
        console.log(data)
        if(data){
          this.dialogRef.close(data)
        }
      },
      error: (error:any)=>{
        console.error(error)
      }
    })


  }
  modificarArea(){
    let request: AreaRequest = new AreaRequest
    let form = this.formRegistro
    request.id=this.dataEditar.id
    request.nombre=form.controls['nombre'].value
    request.descripcion=form.controls['descripcion'].value
    request.estado=form.controls['estado'].value
    request.horas=form.controls['horas'].value

    let grado:any = this.listaGrados.filter((x:any) => x.id == form.controls['grado'].value)
    request.grado=grado[0]
    console.log(request)
    this.areaService.updateAreas(request).subscribe({
      next: (data:any)=>{
        console.log(data)
        if(data){
          this.dialogRef.close(data)
        }
      },
      error: (error:any)=>{
        console.error(error)
      }
    })
  }
}
