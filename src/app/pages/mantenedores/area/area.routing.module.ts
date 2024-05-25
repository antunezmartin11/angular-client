import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './area.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path:'',
    component: AreaComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule {}
