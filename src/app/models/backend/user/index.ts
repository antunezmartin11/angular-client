export interface User{
  id: number;
  username: string;
  persona: Persona;
  email: string;
  token: string;
}

export interface Persona{
  id: number | null,
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: number,
  numeroDocumento: string,
  direccion: string,
  telefono: string,
  estado: boolean
}

export interface TipoDocumento{
 id: number,
 nomre: string,
 abreviatura: string,
 estado: boolean
}
