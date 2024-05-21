import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoDocumentoService } from '@app/services/backend/TipoDocumento.service';
import { DialogNewTipoDocumentoComponent } from './dialog-new-tipoDocumento/dialog-new-tipoDocumento.component';
import { NotificationService } from '@app/services/notification/notification.service';
import { isEmpty } from 'rxjs';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { TipoDocumentoRequest } from '@app/models/backend/maestros/clases-maestro';


@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css'],
})
export class TipoDocumentoComponent implements OnInit {

  listaTipoDocumento: any[]=[];
  formFiltro!: FormGroup
  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    public dialog: MatDialog,
    private notification: NotificationService,
    public dialogConfirm: MatDialog
  ){

  }

  ngOnInit(): void {
    this.init()
    this.dataSource.paginator = this.paginator;
    this.obtenerListaTipoDocumento();
  }

  displayedColumns: string[] = ['id', 'nombre', 'abreviatura', 'estado','modificar','eliminar'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  init(){
    this.formFiltro = new FormGroup({
      filtro: new FormControl(null),

    })
  }

  obtenerListaTipoDocumento(){
    let tDoc: TipoDocumentoRequest = new TipoDocumentoRequest
    tDoc.nombre=this.formFiltro.controls['filtro'].value
    console.log(tDoc)
    this.tipoDocumentoService.listarTipoDocumentoService(tDoc).subscribe(
      {
        next: (data:any) => {
          console.log(data);
          this.listaTipoDocumento = data.data;
          this.dataSource.data=this.listaTipoDocumento;
          this.dataSource.paginator=this.paginator;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
  editarElemento(data:any){
    const dialogRef = this.dialog.open(DialogNewTipoDocumentoComponent,{
      data: data
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result.codigo=='200'){
        this.obtenerListaTipoDocumento();
        this.notification.success('Tipo documento registrado correctamente')
      }else if(!result){

      }
      else{
        this.notification.error('Ocurrio un error en el servicio')
      }
    })
  }

  eliminarElemento(data:any){

    const dialog=this.dialogConfirm.open(DialogConfirmComponent, {
      width: '250px',
      data:{
        titulo:'Eliminar elemento',
        mensaje:'¿Desea eliminar el tipo documento seleccionado?'
      }
    });
    dialog.afterClosed().subscribe(result=>{
      console.log(result)
      if(result){
        this.tipoDocumentoService.deleteTipoDocumentos(data).subscribe((data:any)=>{
          if(data.codigo='200'){{
            this.notification.error('Se elimino el registro')
            this.obtenerListaTipoDocumento();
          }}
        })
      }
    })
  }

  aplicarFiltro(){
    this.obtenerListaTipoDocumento()
  }

  agregarElemento(){
    const dialogRef = this.dialog.open(DialogNewTipoDocumentoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

      if(result.codigo=='201'){
        this.obtenerListaTipoDocumento();
        this.notification.success('Tipo documento registrado correctamente')
      }else if(!result){

      }
      else{
        this.notification.error('Ocurrio un error en el servicio')
      }
    });
  }
  getColorClass(estado: boolean): string {
    return estado ? 'activo' : 'inactivo';
  }

}
