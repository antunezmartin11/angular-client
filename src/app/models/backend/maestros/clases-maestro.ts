
export class TipoDocumentoRequest{

  id!: number;
  nombre!: string;
  abreviatura!: string;
  estado!: string;
  eliminado!: boolean;
}

export class AreaRequest{
  id!: number;
  nombre!: string;
  descripcion!: string;
  horas!: number;
  estado!: string;
  eliminado!: boolean;
  grado: GradoRequest = new GradoRequest
}

export class GradoRequest{

  id!: number;
  nombre!: string;
  abreviatura!: string;
  estado!: string;
  eliminado!: boolean;
}
