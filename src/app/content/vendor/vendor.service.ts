import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppinitService } from 'src/app/misc/appinit.service';
import { Vendor } from './vendor.class';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  get url() {return `${this.init.config.baseurl}/api/vendors`}
  constructor(
    private init: AppinitService,
    private http: HttpClient
  ) { }
  list(): Observable<Vendor[]>{
    return this.http.get(`${this.url}`) as Observable<Vendor[]>;
  }
  get(id:number): Observable<Vendor>{
    return this.http.get(`${this.url}/${id}`) as Observable<Vendor>;
  }
  create(X:Vendor):Observable<Vendor>{
    return this.http.post(`${this.url}`, X) as Observable<Vendor>;
  }
  change(X:Vendor):Observable<any>{
    return this.http.put(`${this.url}/${X.id}`, X) as Observable<Vendor>;
  }
  remove(id:number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`) as Observable<any>;
  }
}
