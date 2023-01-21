import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Usuario from '../../model/Usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  addUsuarioForm = this.formBuilder.group({
    nome: '',
    email: '',
    senha: '',
  });

  onSubmit() {
    const usuario = new Usuario(
      this.addUsuarioForm.value.nome ?? '',
      this.addUsuarioForm.value.email ?? '',
      this.addUsuarioForm.value.senha ?? '',
    );
    //checar uso do email
    this.usuarioService.obterUsuarios().subscribe((data) => {
      let usuarios = data;
      let check = usuarios.find(x => x.email == usuario.email)
      if (check != undefined) {
        alert("Email já em uso");
      } else {
        // Aqui vamos enviar os dados para backend.
        // Interações com camadas de dados devem ser feitas pelo service.
        this.usuarioService.adicionarUsuario(usuario).subscribe((retorno) => {
          alert("Usuário adicionado com sucesso!")
          this.route.navigate(['/login']);
        });
      }
    }
    )

  }

}
