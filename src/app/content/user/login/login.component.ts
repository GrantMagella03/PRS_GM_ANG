import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { User } from '../user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  un:string="";
  pw:string="";
  inc:boolean=false
  constructor(
    public SSVC:systemService,
    private route: ActivatedRoute,
    private router: Router
  ){}
    loginclick(){
      this.SSVC.user = null;
      this.SSVC.login(this.un,this.pw).subscribe({
      next: (res)=>{
        this.SSVC.user=res;
        if(this.SSVC.user.isAdmin===true){
          this.SSVC.loggedAdmin=true;
        }else{
          this.SSVC.loggedAdmin=false;
        }
        if(this.SSVC.user.isReviewer===true){
          this.SSVC.REVIEWER=true;
        }else{
          this.SSVC.REVIEWER=false;
        }
        this.inc=false;
        this.router.navigateByUrl(`/home`)
      },
      error: (err)=>{
        console.error(err);
        this.inc=true;
      }
    });
    }
}
