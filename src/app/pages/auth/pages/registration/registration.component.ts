import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TipoDocumentoRequest } from '@app/models/backend/maestros/clases-maestro';
import { TipoDocumentoService } from '@app/services/backend/TipoDocumento.service';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  loading$! : Observable<boolean | null>;
  listaTipoDocumento: any[]=[];
  formRegister!: FormGroup
  constructor(
    private store: Store<fromRoot.State>,
    private tipoDocumentoService: TipoDocumentoService
  ) { }
  init(){
    this.formRegister = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      nombres: new FormControl(null, [Validators.required]),
      apellidoPaterno: new FormControl(null, [Validators.required]),
      apellidoMaterno: new FormControl(null, [Validators.required]),
      numeroDocumento: new FormControl(null, [Validators.required]),
      telefono: new FormControl(null, [Validators.required]),
      direccion: new FormControl(null, [Validators.required]),
      tipoDocumento: new FormControl(null, [Validators.required]),
      rePassword: new FormControl(null, [Validators.required])
    })
  }
  ngOnInit(): void {
    this.init()
    this.loading$ = this.store.pipe(select(fromUser.getLoading));
    this.obtenerListaTipoDocumento()
  }

  obtenerListaTipoDocumento(){
    let tDoc: TipoDocumentoRequest = new TipoDocumentoRequest

    this.tipoDocumentoService.listarTipoDocumentoService(tDoc).subscribe(
      {
        next: (data:any) => {
          console.log(data);
          this.listaTipoDocumento = data.data
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
  registrarUsuario() {
    let form = this.formRegister
    if(form.valid) {
        let objetoTipoDoc=this.listaTipoDocumento.filter((data:any)=> data.id==form.controls['tipoDocumento'].value)
        console.log(objetoTipoDoc)
        const userCreateRequest : fromUser.UserCreateRequest =  {
          persona: {
            id: null, // Puedes asignar cualquier valor por defecto para id
            nombres: form.controls['nombres'].value,
            apellidoPaterno: form.controls['apellidoPaterno'].value, // Asumiendo que estas propiedades son requeridas
            apellidoMaterno: form.controls['apellidoMaterno'].value,
            tipoDocumento: objetoTipoDoc[0],
            numeroDocumento: form.controls['numeroDocumento'].value,
            direccion: form.controls['direccion'].value,
            telefono: form.controls['telefono'].value,
            estado: true
          },
          username: form.controls['username'].value,
          email: form.controls['email'].value,
          password: form.controls['password'].value
        }
        console.log(userCreateRequest)
       this.store.dispatch(new fromUser.SignUpEmail(userCreateRequest));
    }

  }


}
