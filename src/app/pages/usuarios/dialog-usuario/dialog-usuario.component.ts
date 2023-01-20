import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.css']
})
export class DialogUsuarioComponent {

  dialogTitleUsuario: string="";
  isEditModeUsuario: boolean=false;


  addUsuarioForm = this.formBuilder.group({
    id:'',
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
    if(this.data.usuario.id==0)
     this.dialogTitleUsuario = "Novo Usuario"
    else {
      this.dialogTitleUsuario = (this.data.disableFormUsuario)? "Detalhe do Usuario" : "Editar Usuario";
    }
    this.isEditModeUsuario = (this.data.usuario.id!=0)
    if(this.data.disableFormUsuario)
      this.addUsuarioForm.disable();
  }

  salvar(){
    if(this.data.usuario.id==0)
    {
      this.data.usuario.id="e948e219-b42f-4829-8788-94723c335def";
      this.usuarioService.adicionarUsuario(this.data.usuario).subscribe(res=>{
        alert("Adicionado com sucesso!");
     });
    } else {
      this.usuarioService.editarUsuario(this.data.usuario).subscribe(res=>{
        alert("Atualizado com sucesso!");
     });
    }
    this.dialogRef.close();
  }

}
