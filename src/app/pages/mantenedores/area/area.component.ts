import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AreaRequest, GradoRequest } from '@app/models/backend/maestros/clases-maestro';
import { AreaService } from '@app/services/backend/area.service';
import { NotificationService } from '@app/services/notification/notification.service';
import { DialogNewAreaComponent } from './dialog-new-area/dialog-new-area.component';
import { GradoService } from '@app/services/backend/grado.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  listaAreas: any[]=[];
  formArea!: FormGroup
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'horas','grado','estado','modificar','eliminar'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  listaGrados:any[]=[];
  constructor(
    public dialog: MatDialog,
    private notification: NotificationService,
    public dialogConfirm: MatDialog,
    private areaService : AreaService,
    private gradoService: GradoService
  ) { }

  init(){
    this.formArea = new FormGroup({
      filtro: new FormControl(null),
      grado: new FormControl(null),
      estado: new FormControl(null),

    })
  }

  ngOnInit() {
    this.init();
    this.dataSource.paginator = this.paginator;
    this.obtenerListaAreas();
    this.obtenerListaGrados()
  }

  obtenerListaAreas(){
    let form = this.formArea
    let request: AreaRequest = new AreaRequest
    request.nombre=form.controls['filtro'].value
    request.grado.id=form.controls['grado'].value
    request.estado=form.controls['estado'].value

    this.areaService.listarAreas(request).subscribe(
      {
        next: (data:any)=>{
          console.log(data)
          this.listaAreas=data.data
          this.dataSource.data=this.listaAreas
          this.dataSource.paginator=this.paginator
        },
        error:(error)=>{
          console.error(error)
        }
      }
    )

  }
  mostrarGrado(dato:any){

    if(dato==null){
      return ''
    }else{
      return dato.nombre
    }
  }
  agregarArea(){
    const dialogRef = this.dialog.open(DialogNewAreaComponent);

    dialogRef.afterClosed().subscribe(result =>{
      console.log(result)
      if(result.codigo=='200'){
        this.obtenerListaAreas()
        this.notification.success('Area registrada correctamente')
      }else if(result.codigo=='302'){
        this.notification.error(result.mensaje)
      }
    })

  }

  filtrarArea(){
   this.obtenerListaAreas()
  }

  editarArea(data:any){
    const dialogRef = this.dialog.open(DialogNewAreaComponent,{
      data: data
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log(result)
      if(result.codigo=='200'){
        this.obtenerListaAreas()
        this.notification.success('Area actualizada correctamente.')
      }else if(result.codigo=='404'){
        this.notification.error(result.mensaje)
      }else if(result.codigo='302'){
        this.notification.error(result.mensaje)
      }
    })
  }

  eliminarArea(data:any){
    const dialog=this.dialogConfirm.open(DialogConfirmComponent, {
      width: '250px',
      data:{
        titulo:'Eliminar elemento',
        mensaje:'¿Desea eliminar el area seleccionada?'
      }
    });
    dialog.afterClosed().subscribe(result=>{
      console.log(result)
      if(result){
        this.areaService.deleteAreas(data).subscribe((data:any)=>{
          if(data.codigo='200'){
            this.notification.success('Se elimino el registro')
            this.obtenerListaAreas();
          }else{
            this.notification.error(data.mensaje)
          }
        })
      }
    })
  }
  getColorClass(estado: boolean): string {
    return estado ? 'activo' : 'inactivo';
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

}
