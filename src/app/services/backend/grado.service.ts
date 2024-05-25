import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

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

private listarGrados: string ="api/grado/getAllGrado"

public listarGrado(){
  return this.httpCliente.get(`${environment.url}${this.listarGrados}`,this.getHeaders());
}

}
