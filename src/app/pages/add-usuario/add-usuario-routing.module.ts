import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddUsuarioComponent } from './add-usuario.component';


const routes: Routes = [
  {
    path: '',
    component: AddUsuarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUsuarioRoutingModule { }
