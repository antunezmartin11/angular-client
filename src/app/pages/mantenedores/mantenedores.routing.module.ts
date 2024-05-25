import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path : 'tipoDocumento',
    loadChildren:()=> import('./tipo-documento/tipo-documento.module').then(m=>m.TipoDocumentoModule),
    canActivate: [AuthGuard]
  },
  {
    path : 'area',
    loadChildren:()=> import('./area/area.module').then(m=>m.AreaModule),
    canActivate: [AuthGuard]
  },
  {
    path : 'tipoContrato',
    loadChildren:()=> import('./tipo-contrato/tipo-contrato.module').then(m=>m.TipoContratoModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MantenedoresRoutingModule {}
