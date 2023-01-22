import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsuarioComponent } from './pages/add-usuario/add-usuario.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthService } from './service/auth.service';


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "cadastro",
    loadChildren: () => import('./pages/add-usuario/add-usuario.module').then(m => m.AddUsuarioModule)
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthService], // Estou referenciando a qual serviço vai ser responsável
    // por falar se o usuario pode acessar ou não essa rota.
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [AuthService],
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pages/produtos/produtos.module').then(m => m.ProdutosModule),
    canActivate: [AuthService],
  },
  {
    path: "loja",
    component: ComprasComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
