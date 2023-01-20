import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Usuario from '../model/Usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  readonly UsuarioApiUrl = "http://localhost:5000/api/Usuario";

  
  // login = (email: string, senha: string) =>
  // this.http.post(this.UsuarioApiUrl+'/login', { email, senha });
  
  // validaLogin = (token: string) =>
  //    this.http.post('http://localhost:5000/api/Usuario/valida', { "token": token }, 
  //     {
  //       headers: this.buildHeaders(),
  //       observe: 'response',
  //     });

  // buildHeaders = () =>
  //   new HttpHeaders().set('token', localStorage.getItem('Xtoken') ?? '');
  
  obterUsuarios():Observable<Usuario[]>
  {
    return this.http.get<Usuario[]>((this.UsuarioApiUrl), {
      headers: this.authService.buildHeaders(),
    }); ;
  }

  obterUsuario(id: any):Observable<Usuario>
  {
    return this.http.get<Usuario>((this.UsuarioApiUrl+"/"+id), {
      headers: this.authService.buildHeaders(),
    });;
  }
  
  adicionarUsuario = (usuario: Usuario) =>
    this.http.post(this.UsuarioApiUrl, usuario, {
      headers: this.authService.buildHeaders(),
    });;

  editarUsuario(usuario: any)
  {    
    return this.http.put(this.UsuarioApiUrl+"/"+usuario.id, usuario, {
      headers: this.authService.buildHeaders(),
    });;
  }

  deletarUsuario(id: any)
  { 
    return this.http.delete(this.UsuarioApiUrl+"/"+id, {
      headers: this.authService.buildHeaders(),
    });;
  }
}

