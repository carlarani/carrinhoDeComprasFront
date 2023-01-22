import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Usuario from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';
import { Guid } from "guid-typescript";
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  usuariosComFiltro: any = [];
  usuario: Usuario | undefined;
  disableFormUsuario: boolean = false;
  UsuarioFiltro: string = "";

  displayedColumns: string[] = ['nome', 'email', 'role', 'detail', 'edit', 'delete'];


  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
  ) {
  }

  ngOnInit(): void {
    this.carregarTabelaUsuarios();
  }

  public carregarTabelaUsuarios(): Usuario[] {
    this.usuarioService.obterUsuarios().subscribe(data => {
      this.usuarios = data;
      this.usuariosComFiltro = data;
    })
    return this.usuariosComFiltro;
  };

  OnAddClick() {
    this.usuario = {
      id: "235bd574-d661-43bd-a7b0-2328ca64fcfa",
      nome: "",
      email: "",
      senha: "",
      role: "",
    }
    this.OpenDialog(this.usuario);
  }

  OnViewClick(usuario: any) {
    this.usuario = usuario;
    this.disableFormUsuario = true;
    this.OpenDialog(this.usuario);
  }

  OnEditClick(usuario: any) {
    this.usuario = usuario;
    this.OpenDialog(this.usuario);

  }

  OnDeleteClick(usuario: any) {

    if (confirm("Tem certeza que deseja deletar item?")) {
      this.usuarioService.deletarUsuario(usuario.id)
        .subscribe((data: any) => {
          alert("Item removido com sucesso!");
          return data = this.carregarTabelaUsuarios();
        }
        )
    }
  }

  OpenDialog(usuario: any) {
    this.dialogRef = this.dialog.open(DialogUsuarioComponent, {
      data: {
        usuario: usuario,
        disableFormUsuario: this.disableFormUsuario
      }
    })

    return this.dialogRef.afterClosed()
      .subscribe(res => {
        this.carregarTabelaUsuarios();
        this.disableFormUsuario = false;
      })
  }

  filterFn() {
    var UsuarioFiltro = this.UsuarioFiltro;

    this.usuariosComFiltro = this.usuarios.filter(function (el: any) {
      return el.nome.toString().toLowerCase().includes(
        UsuarioFiltro.toString().trim().toLowerCase())
        ||
        el.email.toString().toLowerCase().includes(
          UsuarioFiltro.toString().trim().toLowerCase()
        )
        ||
        el.role.toString().toLowerCase().includes(
          UsuarioFiltro.toString().trim().toLowerCase()
        )
    })
  }
}
