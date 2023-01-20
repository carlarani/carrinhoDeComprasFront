import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ProdutoService } from 'src/app/service/produto.service';
import Produto from 'src/app/model/Produto';
import { CompraProdutoService } from 'src/app/service/compra-produto.service';
import CompraProduto from 'src/app/model/CompraProduto';
import Usuario from 'src/app/model/Usuario';
import Compra from 'src/app/model/Compra';
import { CompraService } from 'src/app/service/compra.service';
import CompraDisplay from 'src/app/model/CompraDisplay';

@Component({
  selector: 'app-show-compras',
  templateUrl: './show-compras.component.html',
  styleUrls: ['./show-compras.component.css']
})
export class ShowComprasComponent implements OnInit{


  dialogTitle: string = "";
  dialogSubTitle: string = "";
  usuario: Usuario | undefined;
  nomeUsuario: string = "";
  produtos: Produto[] = [];
  compraProdutos: CompraProduto[] = [];
  compraProdutosComFiltro: CompraProduto[] = [];
  compras: Compra[] = [];
  comprasComFiltro: Compra[] = [];
  compraDisplay!: CompraDisplay;
  comprasDisplay: CompraDisplay[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowComprasComponent>,
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService,
    private produtoCompraService: CompraProdutoService,
    private compraService: CompraService,
  ) { }

  ngOnInit() {
    console.log("INIT");

    this.buscarNomeUsuario();

    this.buscarComprasDoUsuario();
  }

  buscarNomeUsuario() {
    this.usuarioService.obterUsuario(this.data.compra.idComprador).subscribe((data) => {
      this.usuario = data;
      this.montarTitulo(this.usuario.nome);
    });
  }

  montarTitulo(nome: string) {
    this.dialogTitle = `Olá, ${nome}! Parabéns pela sua compra!`;
    this.dialogSubTitle= "Veja os detalhes da sua compra";
  }

  buscarComprasDoUsuario() {
    this.compraService.obterCompras().subscribe((data) => {
      this.compras = data;
      //filtrando compras deste usuario
      this.comprasComFiltro = this.compras.filter((el) => {
        return el.idComprador.toString().toLowerCase().includes(
          this.data.compra.idComprador.toString().trim().toLowerCase()
        );
      })
      this.montarEntidadeCompraDisplay(this.comprasComFiltro);
      return this.comprasComFiltro;
    })

  }

  montarEntidadeCompraDisplay(comprasComFiltro: Compra[]) {
    console.log("MontarEntidade");
    console.log("comprasComFiltro");
    console.log(comprasComFiltro);


    comprasComFiltro.forEach((compra) => {
      let comprasProdutoDessaCompra: CompraProduto[] = [];
      let produtosDessaCompra: Produto[] = [];
      console.log(compra.id);

      this.produtoCompraService.obterCompraProdutosPorIdCompra(compra.id).subscribe((data) => {
        comprasProdutoDessaCompra = data;
        console.log("comprasProdutoDessaCompra");
        console.log(comprasProdutoDessaCompra);
        comprasProdutoDessaCompra.forEach((compraProduto) => {
          console.log("compraProduto");
          console.log(compraProduto);
          let produtoDaVez: Produto;
          this.produtoService.obterProduto(compraProduto.idProduto).subscribe((data) => {
            produtoDaVez = data;
            produtosDessaCompra.push(produtoDaVez);
            console.log("produtosDessaCompra");
            console.log(produtosDessaCompra);
            this.compraDisplay = {
              id: compra.id,
              produtos: produtosDessaCompra,
              valorTotal: compra.valorTotal,
              status: compra.status
            }
            console.log("compraDisplay");
            console.log(this.compraDisplay);
            let compraExiste = this.comprasDisplay.filter((compraDisplayDaLista)=>
            {
              return this.compraDisplay.id.includes(compraDisplayDaLista.id)
            })
            console.log(compraExiste);
            if(compraExiste.length==0)
              this.comprasDisplay.push(this.compraDisplay);
            console.log("comprasDisplay");
            console.log(this.comprasDisplay);
            console.log("comprasDisplay");
            console.log(this.comprasDisplay);
            return this.comprasDisplay;
          })
        });

      })
    })
  }
}

