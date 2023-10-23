import { Component } from '@angular/core';
import { systemService } from 'src/app/misc/system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  USERID:number=0;
  constructor(
    private SSVC:systemService,
  ){}
  ngOnInit(){
    this.USERID=this.SSVC.user.id
  }
}
