import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoContratoComponent } from './tipo-contrato.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SpinnerModule } from '@app/shared';
import { TipoContratoRoutingModule } from './tipo-contrato.routing';
import { DialogNewTipoContratoComponent } from './dialog-new-tipo-contrato/dialog-new-tipo-contrato.component';

@NgModule({
  imports: [
    CommonModule,
    TipoContratoRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    SpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule
  ],
  declarations: [TipoContratoComponent,DialogNewTipoContratoComponent]
})
export class TipoContratoModule { }
