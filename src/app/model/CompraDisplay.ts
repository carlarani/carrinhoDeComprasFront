import Produto from './Produto';


export default class CompraDisplay {
  id: string;
  produtos: Produto[]=[];
  valorTotal: number;
  status: string;

  constructor(id: string, produtos: Produto[], valorTotal: number, status: string){
    this.id=id;
    this.produtos=produtos;
    this.valorTotal=valorTotal;
    this.status=status;
  }
}
