import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/services';
import { TipoContratoService } from '@app/services/backend/tipoContrato.service';

@Component({
  selector: 'app-tipo-contrato',
  templateUrl: './tipo-contrato.component.html',
  styleUrls: ['./tipo-contrato.component.css']
})
export class TipoContratoComponent implements OnInit {
  listaTipoContrato: any[]=[];
  formTipoContrato!: FormGroup
  displayedColumns: string[] = ['id', 'nombre', 'observacion', 'estado','modificar','eliminar'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private notification: NotificationService,
    public dialogConfirm: MatDialog,
    private tipoContratoService: TipoContratoService
  ) { }

  ngOnInit() {
    this.init()
    this.obtenerListaContrato()
  }

  init(){
    this.formTipoContrato = new FormGroup({
      filtro: new FormControl(null),
      estado: new FormControl(null)

    })
  }
  obtenerListaContrato(){
    this.tipoContratoService.listarTipoContratos().subscribe({
      next: (data:any)=>{
        console.log(data)
        this.dataSource.data=data.data
      }
    })
  }
  agregarTipoContrato(){

  }
  filtrar(){

  }
  getColorClass(estado: boolean): string {
    return estado ? 'activo' : 'inactivo';
  }

  editarTipoContrato(data:any){

  }

  eliminarTipoContrato(data:any){

  }
}
