import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading$! : Observable<boolean | null>;
  formLogin!: FormGroup
  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.init()
  }
  init(){
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  loginUsuario(): void {
    let form = this.formLogin
    const userLoginRequest : fromUser.EmailPasswordCredentials = {
      email: form.controls['email'].value,
      password: form.controls['password'].value
    };

    this.store.dispatch(new fromUser.SignInEmail(userLoginRequest));


  }

}
