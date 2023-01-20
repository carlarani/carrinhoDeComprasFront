import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CompraProduto from '../model/CompraProduto';

@Injectable({
  providedIn: 'root'
})
export class CompraProdutoService {

  readonly CompraProdutoApiUrl = "http://localhost:5000/api/ProdutoCompras";

  constructor(private http: HttpClient) { }

  obterCompraProdutos():Observable<CompraProduto[]>
  {
    return this.http.get<CompraProduto[]>(this.CompraProdutoApiUrl);
  }

  obterCompraProdutosPorIdCompra(idCompra: any):Observable<CompraProduto[]>
  {
    return this.http.get<CompraProduto[]>(this.CompraProdutoApiUrl+"/Compra/"+idCompra);
  }

  obterCompraProduto(id: any):Observable<CompraProduto>
  {
    return this.http.get<CompraProduto>(this.CompraProdutoApiUrl+"/"+id);
  }

  adicionarCompraProduto(compraProduto: CompraProduto)
  {
    return this.http.post(this.CompraProdutoApiUrl, compraProduto);
  }

  editarCompraProduto(compraProduto: any)
  {    
    return this.http.put(this.CompraProdutoApiUrl+"/"+compraProduto.id, compraProduto);
  }

  deletarCompraProduto(id: any)
  { 
    return this.http.delete(this.CompraProdutoApiUrl+"/"+id);
  }
}
