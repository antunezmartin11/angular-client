import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

constructor(private httpCliente: HttpClient) { }

private getHeaders() {
  const tokenSeguridad = localStorage.getItem('token');

  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenSeguridad}`
    })
  };
}

private listarTipoDocumento: string ="api/tipoDocumento/getTipoDocumento"
private agregarTipoDocumento: string = "api/tipoDocumento/register"
private modificarTipoDocumento: string = "api/tipoDocumento/updateTipoDocumento"
private eliminarTipoDocumento: string = 'api/tipoDocumento/deleteTipoDocumento/'

public listarTipoDocumentoService(request:any){
    return this.httpCliente.post(`${environment.url}${this.listarTipoDocumento}`,request);
  }

  public agregarTipoDocumentos(request:any){
    return this.httpCliente.post(`${environment.url}${this.agregarTipoDocumento}`,request,this.getHeaders());
  }

  public updateTipoDocumentos(request:any){
    return this.httpCliente.post(`${environment.url}${this.modificarTipoDocumento}`,request,this.getHeaders());
  }
  public deleteTipoDocumentos(id:any){
    return this.httpCliente.post(`${environment.url}${this.eliminarTipoDocumento}${id}`,this.getHeaders());
  }

}
