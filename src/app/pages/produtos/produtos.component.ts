import { Component, OnInit} from '@angular/core';
import Produto from '../../model/Produto';
import { ProdutoService } from '../../service/produto.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogProdutoComponent } from './dialog-produto/dialog-produto.component';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{
  produtos: Produto[] = [];
  produtosComFiltro:any=[];
  produto: Produto | undefined;
  disableForm: boolean = false;
  ProdutoFiltro:string="";
  
  displayedColumns: string[] = ['nome','quantidade', 'preco', 'vendedor', 'detail', 'edit', 'delete'];
  


  constructor(
    private produtoService: ProdutoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogProdutoComponent>,
    )
    {
    }
    
    ngOnInit(): void {
      this.carregarTabelaProdutos();
    }

    public carregarTabelaProdutos(): Produto[] {
         this.produtoService.obterProdutos().subscribe(data=>{
        this.produtos=data;
        this.produtosComFiltro=data;
      })
      return this.produtosComFiltro;  
    };

  OnAddClick(){
      this.produto={
        id:Guid.parse("235bd574-d661-43bd-a7b0-2328ca64fcfa").toString(),
        nome:"",
        quantidade:0,
        preco: 0
      }
      this.OpenDialog(this.produto);
  }

  OnViewClick(produto: any){
    this.produto=produto;
    this.disableForm=true;
    this.OpenDialog(this.produto);
  }

    OnEditClick(produto: any) {
      this.produto=produto;
      this.OpenDialog(this.produto);
      
    }

    OnDeleteClick(produto:any)
    {

      if(confirm("Tem certeza que deseja deletar item?")){

      }
      this.produtoService.deletarProduto(produto.id)
      .subscribe(data=>
        {
          alert("Item removido com sucesso!");
          this.carregarTabelaProdutos();
        }
      )
  }

    OpenDialog(produto: any)
    {   
      this.dialogRef = this.dialog.open(DialogProdutoComponent, {
        data: {produto : produto,
              disableForm: this.disableForm}
      })
    
      return this.dialogRef.afterClosed()
      .subscribe(res => {
        this.carregarTabelaProdutos();
        this.disableForm=false;
      })
    }

    filterFn(){
      var ProdutoFiltro = this.ProdutoFiltro;
  
      this.produtosComFiltro = this.produtos.filter(function(el:any){
        return el.nome.toString().toLowerCase().includes(
          ProdutoFiltro.toString().trim().toLowerCase()
          );
      })
    }
}
