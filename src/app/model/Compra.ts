import CompraProdutos from './CompraProduto';
import Usuario from './Usuario';
import { Guid } from "guid-typescript";


export default class Compra {
  id: string;
  idComprador: string;
  valorTotal: number;
  status: string;

  constructor( valorTotal:number, idComprador:string){
    this.id=Guid.create().toString();
    this.idComprador=(idComprador)? idComprador: "235bd574-d661-43bd-a7b0-2328ca64fcfa";
    this.valorTotal=valorTotal
    this.status = "Rascunho"
  }
}
