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
        this.router.navigateByUrl(`/home`)
      },
      error: (err)=>{
        console.error(err);
      }
    });
    }
}
