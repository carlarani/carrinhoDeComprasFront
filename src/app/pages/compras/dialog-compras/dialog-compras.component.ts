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
import CompraProdutoDisplay from 'src/app/model/CompraProdutoDisplay';

@Component({
  selector: 'app-dialog-compras',
  templateUrl: './dialog-compras.component.html',
  styleUrls: ['./dialog-compras.component.css']
})
export class DialogComprasComponent implements OnInit {

  dialogTitle: string = "";
  dialogSubTitle: string = "Seu carrinho está vazio!";
  usuario: Usuario | undefined;
  nomeUsuario: string = "";
  compra!: Compra ;
  compraProdutosDessaCompra: CompraProduto[]=[];
  compraProdutoDisplay!: CompraProdutoDisplay;
  comprasProdutosDisplay: CompraProdutoDisplay[]=[];
  produto!: Produto;
  valorTotal!:number;
  closeButtonText: string="Iniciar as compras";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComprasComponent>,
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService,
    private produtoCompraService: CompraProdutoService,
    private compraService: CompraService,
  ) { }

  ngOnInit() {
    // console.log("INIT");

    this.buscarNomeUsuario();
    this.buscarProdutosDaCompra();
  }

  buscarNomeUsuario() {
    this.usuarioService.obterUsuario(this.data.compra.idComprador).subscribe((data) => {
      this.usuario = data;
      this.montarTitulo(this.usuario.nome);
    });
  }

  montarTitulo(nome: string) {
    this.dialogTitle = `${nome}, seja bem-vindo ao seu carrinho de compras`;
  }

  montarSubTitulo(){
    this.dialogSubTitle= (this.comprasProdutosDisplay.length==0? "Seu carrinho está vazio!": "Veja só como está o seu carrinho até o momento");
    this.closeButtonText = (this.comprasProdutosDisplay.length==0? "Iniciar as compras": "Continuar comprando")
  }

  // buscarCompraDoUsuario() {
  //   this.compraService.obterCompra(this.data.compra.id).subscribe((data) => {
  //     this.compra = data;
  //     return this.compra;
  //   })
  // }

  buscarProdutosDaCompra(){
    this.produtoCompraService.obterCompraProdutosPorIdCompra(this.data.compra.id).subscribe((data=>
      {
        this.compraProdutosDessaCompra = data;
        this.montarEntidadeCompraProdutoDisplay(this.compraProdutosDessaCompra);
        return this.compraProdutosDessaCompra;
      }))
  }

  montarEntidadeCompraProdutoDisplay(compraProdutosDessaCompra: CompraProduto[]){
    compraProdutosDessaCompra.forEach((compraProduto)=>
    {
      this.produtoService.obterProduto(compraProduto.idProduto).subscribe((data)=> 
      {
        this.produto = data

        this.compraProdutoDisplay = {
          id: compraProduto.id,
          idProduto: compraProduto.idProduto,
          idCompra: compraProduto.idCompra,
          nome: this.produto.nome,
          preco: this.produto.preco,
          quantidade: this.produto.quantidade,
          idVendedor: this.produto.idVendedor,
          quantidadeSelecionada: compraProduto.quantidadeSelecionada,
          subtotal:compraProduto.subtotal,
          
        }
        this.valorTotal+=compraProduto.subtotal;
        this.comprasProdutosDisplay.push(this.compraProdutoDisplay);
        this.montarSubTitulo();
        console.log(this.compraProdutoDisplay);
      });
    }
    )
  }

  deletarProdutoCompra(id: string){
    this.produtoCompraService.deletarCompraProduto(id).subscribe((data)=>
    {
      console.log("Item removido do carrinho")
      this.limpaDialog();
    }
    );
  }
  
  limpaDialog(){
    this.compraProdutosDessaCompra=[];
    this.comprasProdutosDisplay=[];
    this.atualizarDialog();
  }

  atualizarDialog(){
    this.buscarProdutosDaCompra();
    this.montarSubTitulo();
  }

  atualizarCompraProduto(compraProdutoDisplay: CompraProdutoDisplay){
    let compraProduto = {
      id:compraProdutoDisplay.id, 
      idProduto: compraProdutoDisplay.idProduto,
      idCompra: compraProdutoDisplay.idCompra,
      nome: compraProdutoDisplay.nome,
      preco: compraProdutoDisplay.preco,
      quantidade: compraProdutoDisplay.quantidade,
      idVendedor: compraProdutoDisplay.idVendedor,
      quantidadeSelecionada: compraProdutoDisplay.quantidadeSelecionada,
      subtotal: compraProdutoDisplay.preco*compraProdutoDisplay.quantidadeSelecionada,
    }
    this.produtoCompraService.editarCompraProduto(compraProduto).subscribe(data=>{
      console.log("Item atualizado com sucesso");
    }
    )
  }

  LimparCarrinho(){
    let id = localStorage.getItem("compra");
    this.produtoCompraService.obterCompraProdutosPorIdCompra(id).subscribe((data)=>
      {
        let produtosCompra = data;
        produtosCompra.forEach((produtoCompra: CompraProduto)=>
          {
            this.produtoCompraService.deletarCompraProduto(produtoCompra.id).subscribe(
              data => console.log("Item deletado")      
            )

          })
          this.compraService.obterCompra(id).subscribe(data=>
            {
              console.log(data);

            })
          
      })
  }
}


  


