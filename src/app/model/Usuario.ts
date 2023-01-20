import { Guid } from "guid-typescript";

export default class Usuario {
    id?:string
    nome: string;
    email: string;
    senha: string;
    role: string;

    constructor(nome: string, email: string, senha:string, id?: string,)
    {
      this.id = (id)? id: Guid.create().toString();
      this.nome=nome;
      this.email=email;
      this.senha=senha;
      this.role="comprador";
    }
  }
  