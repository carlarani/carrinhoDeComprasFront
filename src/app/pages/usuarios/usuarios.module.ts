import { MatButtonModule } from '@angular/material/button';
import { UsuarioRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DetalheUsuarioComponent } from './detalhe-usuario/detalhe-usuario.component';


@NgModule({
  declarations: [UsuariosComponent, DetalheUsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatButtonModule
  ]
})
export class UsuariosModule { }
