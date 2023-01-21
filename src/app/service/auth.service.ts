import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem("Xtoken") ?? '';

  constructor(private http: HttpClient, private router: Router) { }

  buildHeaders = () =>
    new HttpHeaders().set('token', localStorage.getItem('Xtoken') ?? '');

  validaLogin = (token: string) =>
    this.http.post(
      'http://localhost:5000/api/Usuario/valida',
      { token },
      {
        headers: this.buildHeaders(),
        observe: 'response',
      }
    );

  canActivate(route: ActivatedRouteSnapshot) {
    // Escrevemos uma função que retorne verdadeiro ou falso.
    // Retornando verdadeiro, a rota pode ser acessada.
    // Retornando falso, não.

    if (!this.token) {
      this.router.navigate(['/login']);
    }

    this.validaLogin(this.token).subscribe({
      next: (retorno) => {
        // Aqui colocamos a lógica de validação de permissões.
        localStorage.setItem("role", (retorno as any).body.role);

      },
      error: (error) => {
        if (error.status == 500)
          this.deslogar()
      }
    })
  }

  login = (email: string, senha: string) =>
    this.http.post('http://localhost:5000/api/Usuario/login', { email, senha });


  persistToken(token: string, user: string) {
    console.log("Xtoken");
    console.log(token);
    console.log("user");
    console.log(user);

    // if(localStorage.getItem("token"))
    //   localStorage.removeItem("token")
    localStorage.setItem("Xtoken", token);
    localStorage.setItem("user", user);
  }

  getToken() {
    return this.token;
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }
}
