import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ProdutoService } from 'src/app/service/produto.service';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-dialog-produto',
  templateUrl: './dialog-produto.component.html',
  styleUrls: ['./dialog-produto.component.css']
})
export class DialogProdutoComponent {

  dialogTitle: string = "";
  isEditMode: boolean = false;


  addProdutoForm = this.formBuilder.group({
    id: '',
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
    // console.log(this.data.produto.id);

    if (this.data.produto.id == "235bd574-d661-43bd-a7b0-2328ca64fcfa")
      this.dialogTitle = "Novo Produto"
    else {
      this.dialogTitle = (this.data.disableForm) ? "Detalhe do Produto" : "Editar Produto";
    }
    this.isEditMode = (this.data.produto.id != "235bd574-d661-43bd-a7b0-2328ca64fcfa")
    if (this.data.disableForm)
      this.addProdutoForm.disable();
  }

  salvar() {
    if (this.data.produto.id == "235bd574-d661-43bd-a7b0-2328ca64fcfa") {
      this.data.produto.id = Guid.create().toString();
      this.produtoService.adicionarProduto(this.data.produto).subscribe({
        next: (retorno) => {
          alert("Adicionado com sucesso!");
        },
        error: (error) => {
          // console.log(error);

          if (error.status == 400)
            alert("Falha no processo. Atente-se aos campos e use . para separar reais de centavos.");
        }
      })
      this.dialogRef.close();
    }
  }
}
