import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AppinitService } from './appinit.service';
import { User } from '../content/user/user.class';

@Injectable({
  providedIn: 'root'
})
export class systemService {
  get url() {return `${this.init.config.baseurl}/api/users`}
  user:any;
  constructor(
    private init: AppinitService,
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  login(userN:string,PW:string):Observable<any>{
    return this.http.get(`${this.url}/${userN}/${PW}`) as Observable<any>;
  }
  logcheck(){
    //console.debug();
    if(this.user==null||this.user==undefined){
      console.log("invalid");
      this.router.navigateByUrl(`/login`)
    }
  }
}
