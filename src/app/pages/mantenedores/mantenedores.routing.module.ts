import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path : 'tipoDocumento',
    loadChildren:()=> import('./tipo-documento/tipo-documento.module').then(m=>m.TipoDocumentoModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MantenedoresRoutingModule {}
