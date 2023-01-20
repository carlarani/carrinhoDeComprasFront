import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Compra from '../model/Compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  readonly CompraApiUrl = "http://localhost:5000/api/Compras";

  constructor(private http: HttpClient) { }

  obterCompras():Observable<Compra[]>
  {
    return this.http.get<Compra[]>(this.CompraApiUrl);
  }

  obterCompra(id: any):Observable<Compra>
  {
    return this.http.get<Compra>(this.CompraApiUrl+"/"+id);
  }

  adicionarCompra(compra: Compra)
  {
    return this.http.post(this.CompraApiUrl, compra);
  }

  editarCompra(compra: any)
  {    
    return this.http.put(this.CompraApiUrl+"/"+compra.id, compra);
  }

  deletarCompra(id: any)
  { 
    return this.http.delete(this.CompraApiUrl+"/"+id);
  }
}
