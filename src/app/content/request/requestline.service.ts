import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppinitService } from 'src/app/misc/appinit.service';
import { RequestLine } from './requestline.class';

@Injectable({
  providedIn: 'root'
})
export class RequestLineService {
  get url() {return `${this.init.config.baseurl}/api/RequestLines`}
  constructor(
    private init: AppinitService,
    private http: HttpClient
  ) { }
  list(): Observable<RequestLine[]>{
    return this.http.get(`${this.url}`) as Observable<RequestLine[]>;
  }
  get(id:number): Observable<RequestLine>{
    return this.http.get(`${this.url}/${id}`) as Observable<RequestLine>;
  }
  create(X:RequestLine):Observable<RequestLine>{
    return this.http.post(`${this.url}`, X) as Observable<RequestLine>;
  }
  change(X:RequestLine):Observable<any>{
    return this.http.put(`${this.url}/${X.id}`, X) as Observable<RequestLine>;
  }
  remove(id:number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`) as Observable<any>;
  }
}
