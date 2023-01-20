import { Guid } from "guid-typescript";
import Produto from "./Produto";

export default class CompraProdutoDisplay {
    id: string;
    idProduto: string;
    idCompra: string;
    nome: string;
    preco: number;
    quantidade: number;
    idVendedor?: number;
    quantidadeSelecionada: number;
    subtotal:number;


    constructor(id: string, produto:Produto, idCompra: string)
   {
    this.id= id,
    this.idProduto=produto.id;
    this.idCompra=idCompra;
    this.nome=produto.nome;
    this.preco=produto.preco, 
    this.quantidade=produto.quantidade;
    this.quantidadeSelecionada=0,
    this.subtotal=0
   }
}
