import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ProdutoService } from 'src/app/service/produto.service';


@Component({
  selector: 'app-dialog-produto',
  templateUrl: './dialog-produto.component.html',
  styleUrls: ['./dialog-produto.component.css']
})
export class DialogProdutoComponent {

  dialogTitle: string="";
  isEditMode: boolean=false;


  addProdutoForm = this.formBuilder.group({
    id:'',
    nome: '',
    quantidade: '',
    preco: '',
    idVendedor: '',
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              public dialogRef: MatDialogRef<DialogProdutoComponent>,
              private formBuilder: FormBuilder,
              private produtoService: ProdutoService, 
              ) { }


  ngOnInit(): void {
    if(this.data.produto.id==0)
     this.dialogTitle = "Novo Produto"
    else {
      this.dialogTitle = (this.data.disableForm)? "Detalhe do Produto" : "Editar Produto";
    }
    this.isEditMode = (this.data.produto.id!=0)
    if(this.data.disableForm)
      this.addProdutoForm.disable();
  }

  salvar(){
    if(this.data.produto.id==0)
    {
      this.data.produto.id="e948e219-b42f-4829-8788-94723c335def";
      this.produtoService.adicionarProduto(this.data.produto).subscribe(res=>{
        alert("Adicionado com sucesso!");
     });
    } else {
      this.produtoService.editarProduto(this.data.produto).subscribe(res=>{
        alert("Atualizado com sucesso!");
     });
    }
    this.dialogRef.close();
  }

}
