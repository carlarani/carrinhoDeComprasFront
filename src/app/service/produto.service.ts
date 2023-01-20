import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import Produto from '../model/Produto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  readonly ProdutoApiUrl = "http://localhost:5000/api/Produto";

  constructor(private http: HttpClient, private authService: AuthService) { }


  obterProdutos= ():Observable<Produto[]> =>
  this.http.get<Produto[]>((this.ProdutoApiUrl), {
    headers: this.authService.buildHeaders(),
  });

  obterProdutosComPaginacao= (pag : number, res: number):Observable<Produto[]> =>
  this.http.get<Produto[]>((this.ProdutoApiUrl+"/pag/"+pag+"/res/"+res), {
    headers: this.authService.buildHeaders(),
  });

  obterProduto(id: any):Observable<Produto>
  {
    return this.http.get<Produto>((this.ProdutoApiUrl+"/"+id), {
      headers: this.authService.buildHeaders(),
    });
  }

  adicionarProduto(produto: Produto)
  {
    return this.http.post(this.ProdutoApiUrl, produto, {
      headers: this.authService.buildHeaders(),
    });
  }

  editarProduto(produto: any)
  {    
    return this.http.put((this.ProdutoApiUrl+"/"+produto.id), produto, {
      headers: this.authService.buildHeaders(),
    });
  }

  deletarProduto(id: any)
  { 
    return this.http.delete((this.ProdutoApiUrl+"/"+id), {
      headers: this.authService.buildHeaders(),
    });;
  }
  

}
