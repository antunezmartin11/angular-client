import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoContratoService {

  constructor(private httpCliente: HttpClient) { }

  private listarTipoContrato: string ="api/tipoContrato/listar"

public listarTipoContratos(){
    return this.httpCliente.get(`${environment.url}${this.listarTipoContrato}`);
  }
}
