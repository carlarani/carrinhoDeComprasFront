import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ProdutosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProdutosRoutingModule, 
    FormsModule, 
    MatTableModule, 
    MatIconModule, 
    NgxPaginationModule
    
  ]
})
export class ProdutosModule { }
