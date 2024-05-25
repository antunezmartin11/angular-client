import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoContratoComponent } from './tipo-contrato.component';

const routes: Routes = [
  {
    path:'',
    component: TipoContratoComponent
   },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoContratoRoutingModule{}
