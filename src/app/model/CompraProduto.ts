import Produto from "./Produto";
import { Guid } from "guid-typescript";

export default class CompraProduto {
  id: string;
  idProduto: string;
  idCompra: string;
  quantidadeSelecionada: number; 
  subtotal: number

  constructor(idProduto:string, idCompra: string, quantidadeSelecionada:number, subtotal: number){
      this.id = Guid.create().toString(); 
      this.idProduto=idProduto;
      this.idCompra=idCompra;
      this.quantidadeSelecionada=quantidadeSelecionada;
      this.subtotal=subtotal;
  }
}