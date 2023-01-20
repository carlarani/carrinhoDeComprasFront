import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import Usuario from 'src/app/model/Usuario';
import { CompraService } from 'src/app/service/compra.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-detalhe-usuario',
  templateUrl: './detalhe-usuario.component.html',
  styleUrls: ['./detalhe-usuario.component.css']
})
export class DetalheUsuarioComponent implements OnInit{
 usuario!: Usuario;


constructor(private usuarioService: UsuarioService, private compraService: CompraService){

}

  ngOnInit(): void {
    this.obterUsuario();

  }

  

  private obterUsuario() {
    let id = localStorage.getItem("user");
    this.usuarioService.obterUsuario(id).subscribe((data) => {
      this.usuario = data;
      return this.usuario;
    });
  }
}
