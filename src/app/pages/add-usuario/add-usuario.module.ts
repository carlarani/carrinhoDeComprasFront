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
    AddUsuarioRoutingModule
  ]
})
export class AddUsuarioModule { }
