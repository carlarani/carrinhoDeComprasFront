import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AddUsuarioComponent } from './pages/add-usuario/add-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { DialogProdutoComponent } from './pages/produtos/dialog-produto/dialog-produto.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DialogUsuarioComponent } from './pages/usuarios/dialog-usuario/dialog-usuario.component';
import { ComprasComponent } from './pages/compras/compras.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HeaderComponent } from './shared/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { DialogComprasComponent } from './pages/compras/dialog-compras/dialog-compras.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowComprasComponent } from './pages/compras/show-compras/show-compras.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    DialogProdutoComponent,
    DialogUsuarioComponent,
    ComprasComponent,
    DialogComprasComponent,
    ShowComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule, 
    MatPaginatorModule,
    MatCardModule,
    MatExpansionModule, 
    NgxPaginationModule
    ],
    providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
