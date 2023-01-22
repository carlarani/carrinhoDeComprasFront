import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.css']
})
export class DialogUsuarioComponent {

  dialogTitleUsuario: string = "";
  isEditModeUsuario: boolean = false;


  addUsuarioForm = this.formBuilder.group({
    id: '',
    nome: '',
    email: '',
    senha: '',
    role: '',
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
  ) { }


  ngOnInit(): void {
    if (this.data.usuario.id == "235bd574-d661-43bd-a7b0-2328ca64fcfa")
      this.dialogTitleUsuario = "Novo Usuario"
    else {
      this.dialogTitleUsuario = (this.data.disableFormUsuario) ? "Detalhe do Usuario" : "Editar Usuario";
    }
    this.isEditModeUsuario = (this.data.usuario.id != "235bd574-d661-43bd-a7b0-2328ca64fcfa")
    if (this.data.disableFormUsuario)
      this.addUsuarioForm.disable();
  }

  salvar() {
    if (this.data.usuario.id == "235bd574-d661-43bd-a7b0-2328ca64fcfa") {
      //checar se email já esta sendo usado
      this.usuarioService.obterUsuarios().subscribe((data) => {
        let usuarios = data;
        let check = usuarios.find(x => x.email == this.data.usuario.email)
        if (check != undefined) {
          alert("Email já em uso");
        } else {
          // Aqui vamos enviar os dados para backend.
          // Interações com camadas de dados devem ser feitas pelo service.
          this.data.usuario.id = Guid.create().toString();
          this.usuarioService.adicionarUsuario(this.data.usuario).subscribe(res => {
            alert("Adicionado com sucesso!");
          });
        }
      })
    }
    else {
      this.usuarioService.editarUsuario(this.data.usuario).subscribe(res => {
        alert("Atualizado com sucesso!");
      });
    }
    this.dialogRef.close();
  }

}
