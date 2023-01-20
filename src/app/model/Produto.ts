import { Guid } from "guid-typescript";

export default class Produto {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
    idVendedor?: number;

    constructor(nome: string, preco: number, quantidade: number, idVendedor?: number)
    {
      this.id=Guid.parse("235bd574-d661-43bd-a7b0-2328ca64fcfa").toString();
      this.nome=nome;
      this.preco=preco;
      this.quantidade=quantidade;
      this.idVendedor=idVendedor
    }
  }

  