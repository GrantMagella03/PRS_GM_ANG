import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppinitService } from 'src/app/misc/appinit.service';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  get url() {return `${this.init.config.baseurl}/api/products`}
  constructor(
    private init: AppinitService,
    private http: HttpClient
  ) { }
  list(): Observable<Product[]>{
    return this.http.get(`${this.url}`) as Observable<Product[]>;
  }
  get(id:number): Observable<Product>{
    return this.http.get(`${this.url}/${id}`) as Observable<Product>;
  }
  create(X:Product):Observable<Product>{
    return this.http.post(`${this.url}`, X) as Observable<Product>;
  }
  change(X:Product):Observable<any>{
    return this.http.put(`${this.url}/${X.id}`, X) as Observable<Product>;
  }
  remove(id:number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`) as Observable<any>;
  }
}
