import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import Compra from 'src/app/model/Compra';
import CompraProdutos from 'src/app/model/CompraProduto';
import CompraProdutoDisplay from 'src/app/model/CompraProdutoDisplay';
import Produto from 'src/app/model/Produto';
import Usuario from 'src/app/model/Usuario';
import { CompraProdutoService } from 'src/app/service/compra-produto.service';
import { CompraService } from 'src/app/service/compra.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogProdutoComponent } from '../produtos/dialog-produto/dialog-produto.component';
import { DialogComprasComponent } from './dialog-compras/dialog-compras.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ComprasComponent {
  quantidadeSelecionada: number = 0;
  compra!: Compra;
  compraProduto!: CompraProdutos;
  comprasProdutos: CompraProdutos[] = [];
  compraProdutoDisplay!: CompraProdutoDisplay;
  listaCompraProdutoDisplay: CompraProdutoDisplay[] = [];
  listaCompraProdutoDisplayComFiltro: CompraProdutoDisplay[] = [];
  produto!: Produto;
  produtos: Produto[] = [];
  disableForm: boolean = false;
  ProdutoFiltro: string = "";
  IsEditMode: boolean = false;
  IsUpdateMode: boolean = false;

  paginaSelecionada: number = 1;
  ultimaPagina!: number;
  resultadosPorPágina: number = 50;
  paginaAtual!: number;

  constructor(
    private produtoService: ProdutoService,
    private compraService: CompraService,
    private compraProdutoService: CompraProdutoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComprasComponent>,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.criarCompra();
    console.log("idCompra");
    console.log(this.compra.id);
    this.carregarTabelaProdutos(this.IsUpdateMode);
    // console.log("IsEdit");
    // console.log(this.IsEditMode);
  }

  private criarCompra() {
    let idComprador = localStorage.getItem("user");
    this.compra = new Compra(0, idComprador ? idComprador : "");
    this.compraService.adicionarCompra(this.compra).subscribe(data =>
      console.log("Compra iniciada com sucesso"));
    localStorage.setItem("compra", this.compra.id);
    return this.compra;
  }

  private carregarTabelaProdutos(IsUpdateMode: boolean) {

    this.produtoService.obterProdutosComPaginacao(this.paginaSelecionada, this.resultadosPorPágina).subscribe(data => {
      this.produtos = data;
      // console.log(this.produtos);  
      if (IsUpdateMode) {
        // console.log("IF");

        this.atualizarEntidadesCompraProdutosDisplay(this.produtos);
      }
      else {
        // console.log("Else");

        this.carregarTabelaLojaECriarEntidadeCompraProdutoDisplay(this.produtos);
      }

      return this.produtos;
    })
  }

  atualizarEntidadesCompraProdutosDisplay(produtos: Produto[]) {

    for (let i = 0; i < produtos.length; i++) {
      this.compraProdutoService.obterCompraProdutosPorIdCompra(this.compra.id).subscribe((data) => {
        this.comprasProdutos = data;
        this.comprasProdutos.forEach((compraProduto) => {
          if (this.listaCompraProdutoDisplay[i].idProduto == compraProduto.idProduto) {
            this.listaCompraProdutoDisplay[i].quantidadeSelecionada = compraProduto.quantidadeSelecionada;
            this.listaCompraProdutoDisplayComFiltro[i].quantidadeSelecionada = compraProduto.quantidadeSelecionada;
            this.listaCompraProdutoDisplay[i].subtotal = compraProduto.subtotal;
            this.listaCompraProdutoDisplayComFiltro[i].subtotal = compraProduto.subtotal;
          }
        })
        return this.listaCompraProdutoDisplayComFiltro;
      })
    }
  }


  private carregarTabelaLojaECriarEntidadeCompraProdutoDisplay(produtos: Produto[]) {
    // console.log("Entrou loja");

    for (let i = 0; i < produtos.length; i++) {
      // console.log("Entrou for ");

      this.produtoService.obterProduto(produtos[i].id).subscribe(data => {
        let produto = data;
        // console.log("idCompra dentro do carregar loja");

        // console.log(this.compra.id);

        this.compraProdutoDisplay = new CompraProdutoDisplay(Guid.create().toString(), produto, this.compra.id);
        // console.log(this.compraProdutoDisplay);
        // console.log(this.listaCompraProdutoDisplay);
        this.listaCompraProdutoDisplay.push(this.compraProdutoDisplay);
        this.listaCompraProdutoDisplayComFiltro = this.listaCompraProdutoDisplay;
        this.definirUltimaPagina();
        return this.listaCompraProdutoDisplayComFiltro;
      });
    }
    // console.log(this.listaCompraProdutoDisplayComFiltro);
    // return this.listaCompraProdutoDisplayComFiltro;
  }

  filterFn() {
    var ProdutoFiltro = this.ProdutoFiltro;

    this.listaCompraProdutoDisplayComFiltro = this.listaCompraProdutoDisplay.filter(function (produto: any) {
      return produto.nome.toString().toLowerCase().includes(
        ProdutoFiltro.toString().trim().toLowerCase()
      );
    })
    this.definirUltimaPagina();
  }

  Add(compraProdutoDisplay: CompraProdutoDisplay) {
    this.checarSeCompraStatusERascunho();
    //mudar valor de quantidade selecionada
    compraProdutoDisplay.quantidadeSelecionada++;
    //checar se a quantidade selecionada é maior que o estoque
    if (compraProdutoDisplay.quantidadeSelecionada > compraProdutoDisplay.quantidade) {
      alert("Quantidade indisponível!");
      compraProdutoDisplay.quantidadeSelecionada = compraProdutoDisplay.quantidade
    }
    else {
      //chamar montar entidade ProdutoCompra
      this.checarCompraProdutoExiste(compraProdutoDisplay); //tenho a entidade compra produto já verificada se existe entidade (id produto) naquela compra )idCompra.
    }
  }

  checarCompraProdutoExiste(compraProdutoDisplay: CompraProdutoDisplay) {

    this.compraProdutoService.obterCompraProdutos().subscribe((data) => {
      this.comprasProdutos = data;

      let compraProdutoExistente = this.comprasProdutos.find((compraProduto) => {
        // console.log("compraProduto.idCompra");
        // console.log(compraProduto.idCompra);
        // console.log("compraProdutoDisplay.idCompra");
        // console.log(compraProdutoDisplay.idCompra);
        // console.log("compraProdutoDisplay.idCompra==compraProduto.idCompra");
        // console.log(compraProdutoDisplay.idCompra==compraProduto.idCompra);
        return compraProduto.idCompra ==
          compraProdutoDisplay.idCompra
          && compraProduto.idProduto ==
          compraProdutoDisplay.idProduto
      });
      //   console.log("compraProdutoExistente");
      // console.log(compraProdutoExistente);

      this.IsEditMode = (compraProdutoExistente) ? true : false;

      // console.log("IsEdit");
      // console.log(this.IsEditMode);
      this.montarEntidadeCompraProduto(this.IsEditMode, compraProdutoDisplay, (compraProdutoExistente?.id) ? compraProdutoExistente?.id : "")
    });
  }

  Remove(compraProdutoDisplay: CompraProdutoDisplay) {
    this.checarSeCompraStatusERascunho();

    --compraProdutoDisplay.quantidadeSelecionada;

    let compraProdutoExistente = this.comprasProdutos.find((compraProduto) => {
      return compraProduto.idCompra ==
        compraProdutoDisplay.idCompra
        && compraProduto.idProduto ==
        compraProdutoDisplay.idProduto
    });

    this.compraProduto = (compraProdutoExistente) ? compraProdutoExistente : this.compraProduto;

    if (compraProdutoDisplay.quantidadeSelecionada == 0) {
      this.compraProdutoService.deletarCompraProduto(this.compraProduto.id).subscribe(data =>
        console.log("Deletado"));
    }
    else {
      this.IsEditMode = true;
      this.montarEntidadeCompraProduto(this.IsEditMode, compraProdutoDisplay, (compraProdutoExistente?.id) ? compraProdutoExistente.id : "")
    }
  }

  montarEntidadeCompraProduto(IsEditMode: boolean, compraProdutoDisplay: CompraProdutoDisplay, idCompraProduto: string) {
    if (IsEditMode) {
      this.compraProdutoService.obterCompraProduto(idCompraProduto).subscribe(data => {
        this.compraProduto = data;
        return this.compraProduto
      });
    }
    else {
      this.compraProduto = {
        id: Guid.create().toString(),
        idProduto: compraProdutoDisplay.idProduto,
        idCompra: compraProdutoDisplay.idCompra,
        quantidadeSelecionada: compraProdutoDisplay.quantidadeSelecionada,
        subtotal: compraProdutoDisplay.subtotal
      }
    }
    //atualizar com infos da tela
    this.compraProduto.quantidadeSelecionada = compraProdutoDisplay.quantidadeSelecionada;
    this.compraProduto.subtotal = compraProdutoDisplay.quantidadeSelecionada * compraProdutoDisplay.preco;
    this.enviarEntidadeCompraProduto();
  }

  private enviarEntidadeCompraProduto() {
    if (this.IsEditMode) {
      this.compraProdutoService.editarCompraProduto(this.compraProduto).subscribe(data =>
        console.log("Editado")
      );
    }
    else {
      this.compraProdutoService.adicionarCompraProduto(this.compraProduto).subscribe(data =>
        console.log("Adicionado")
      );
    }
    //checando a db de compra produto
    this.compraProdutoService.obterCompraProdutos().subscribe(data => {
      this.comprasProdutos = data;
      // console.log("Check resultado BD: ");

      // console.log(this.comprasProdutos);
      return this.comprasProdutos;
    });


  }


  abrirCarrinho() {
    this.checarSeCompraStatusERascunho();

    this.compraProdutoService.obterCompraProdutos().subscribe((data) => {
      this.comprasProdutos = data;
      return this.comprasProdutos;
    })
    //seleciona apenas os que tem mais de uma unidade selecionada
    let finalizaCompra = this.comprasProdutos.filter(function (compraProduto: any) {
      return compraProduto.quantidadeSelecionada > 0
    })

    //calcula valor final para montar entidade Compras
    this.calculaValorFinal(finalizaCompra)
  }

  private calculaValorFinal(finalizaCompra: CompraProdutos[]) {
    let valorTotal = 0;
    finalizaCompra.forEach((compraProduto) => {
      return valorTotal = valorTotal + compraProduto.subtotal;
    })
    this.montarEntidadeCompra(finalizaCompra, valorTotal)
  }

  private montarEntidadeCompra(finalizaCompra: CompraProdutos[], valorTotal: number) {
    let idComprador = localStorage.getItem("user");
    this.compra = {
      id: this.compra.id,
      valorTotal: valorTotal,
      idComprador: idComprador ? idComprador : "",
      status: "Rascunho"
    };
    this.compraService.editarCompra(this.compra);
    this.openDialog();
  }

  openDialog() {

    this.dialogRef = this.dialog.open(DialogComprasComponent, {
      data: { compra: this.compra }
    })


    return this.dialogRef.afterClosed()
      .subscribe(res => {
        this.IsUpdateMode = true;
        this.carregarTabelaProdutos(this.IsUpdateMode);
      })
  }

  AddPg() {
    this.paginaSelecionada = (this.paginaSelecionada >= this.ultimaPagina) ? this.ultimaPagina : ++this.paginaSelecionada;
    this.carregarTabelaProdutos(this.IsUpdateMode);
  }


  definirUltimaPagina() {
    this.paginaAtual = this.listaCompraProdutoDisplayComFiltro.length / this.resultadosPorPágina;
    this.produtoService.obterProdutos().subscribe(data => {
      let produtosFiltrados = data.filter(data =>
        data.nome.includes(this.ProdutoFiltro))
      this.ultimaPagina = produtosFiltrados.length / this.resultadosPorPágina;
      this.ultimaPagina = produtosFiltrados.length % this.resultadosPorPágina > 0 ? ++this.ultimaPagina : this.ultimaPagina;
      return this.ultimaPagina;
    }
    )
  }

  checarSeCompraStatusERascunho() {
    let compraId = localStorage.getItem("compra");
    this.compraService.obterCompra(compraId).subscribe(data => {
      let compra = data;
      console.log(compra.status);
      console.log(data.status);
      if (compra.status != "Rascunho") {
        alert("Esta compra não permite mais edições");
        if (confirm("Deseja iniciar nova compra?")) {
          window.location.reload()
        } else {
          this.route.navigate(["/home"]);
        }
      }
    })
  }

}
