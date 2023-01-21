import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddUsuarioRoutingModule } from './add-usuario-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { AddUsuarioComponent } from './add-usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AddUsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddUsuarioRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddUsuarioModule { }
