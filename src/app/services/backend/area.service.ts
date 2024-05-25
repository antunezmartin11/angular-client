import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

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

private listarArea: string ="api/area/getAll"
private registrarArea: string = "api/area/register"
private updateArea: string = "api/area/updateArea"
private deleteArea: string = "api/area/deleteArea/"

public listarAreas(request:any){
  return this.httpCliente.post(`${environment.url}${this.listarArea}`,request);
}
public registrarAreas(request:any){
  return this.httpCliente.post(`${environment.url}${this.registrarArea}`,request,this.getHeaders());
}
public updateAreas(request:any){
  return this.httpCliente.post(`${environment.url}${this.updateArea}`,request);
}
public deleteAreas(id:number){
  return this.httpCliente.post(`${environment.url}${this.deleteArea}${id}`,null);
}
}
