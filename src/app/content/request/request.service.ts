import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppinitService } from 'src/app/misc/appinit.service';
import { request } from './request.class';

@Injectable({
  providedIn: 'root'
})
export class requestService {
  get url() {return `${this.init.config.baseurl}/api/requests`}
  constructor(
    private init: AppinitService,
    private http: HttpClient
  ) { }
  list(): Observable<request[]>{
    return this.http.get(`${this.url}`) as Observable<request[]>;
  }
  get(id:number): Observable<request>{
    return this.http.get(`${this.url}/${id}`) as Observable<request>;
  }
  create(X:request):Observable<request>{
    return this.http.post(`${this.url}`, X) as Observable<request>;
  }
  change(X:request):Observable<any>{
    return this.http.put(`${this.url}/${X.id}`, X) as Observable<request>;
  }
  remove(id:number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`) as Observable<any>;
  }
  review(id:number, X:request): Observable<any>{
    return this.http.put(`${this.url}/review/${id}`,X) as Observable<any>;
  }
  approve(id:number, X:request): Observable<any>{
    return this.http.put(`${this.url}/approve/${id}`,X) as Observable<any>;
  }
  reject(id:number, X:request): Observable<any>{
    return this.http.put(`${this.url}/reject/${id}`,X) as Observable<any>;
  }
}
