import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoServiceService {

constructor(private httpCliente: HttpClient) { }

private listarTipoDocumento: string ="api/tipoDocumento/getTipoDocumento"

  public listarTipoDocumentoService(){
    return this.httpCliente.get(`${environment.url}${this.listarTipoDocumento}`);
  }
}
