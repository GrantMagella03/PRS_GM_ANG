import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    private SSVC:systemService,
    private router: Router
  ){}
  ngOnInit():void{
    this.SSVC.user=null;
    this.SSVC.loggedAdmin=false;
    this.router.navigateByUrl("/login")
  }
}
