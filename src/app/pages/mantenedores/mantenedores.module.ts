import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenedoresRoutingModule } from './mantenedores.routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [
    CommonModule,
    MantenedoresRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class MantenedoresModule { }
