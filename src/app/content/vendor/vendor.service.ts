import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppinitService } from 'src/app/misc/appinit.service';
import { User } from '../user/user.class';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  get url() {return `${this.init.config.baseurl}/api/users`}
  constructor(
    private init: AppinitService,
    private http: HttpClient
  ) { }
  list(): Observable<User[]>{
    return this.http.get(`${this.url}`) as Observable<User[]>;
  }
  get(id:number): Observable<User>{
    return this.http.get(`${this.url}/${id}`) as Observable<User>;
  }
  create(X:User):Observable<User>{
    return this.http.post(`${this.url}`, X) as Observable<User>;
  }
  change(X:User):Observable<any>{
    return this.http.put(`${this.url}/${X.id}`, X) as Observable<User>;
  }
  remove(id:number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`) as Observable<any>;
  }
}
