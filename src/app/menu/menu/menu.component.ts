import { Component } from '@angular/core';
import { systemService } from 'src/app/misc/system.service';
import { Menu } from '../menu.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  ADMIN:boolean=false;
  constructor(
    private SSVC: systemService,
  ){}
  menus: Menu[] = [
    new Menu("LOGOUT","/logout"),
    new Menu("HOME", "/home"),
    new Menu("USERS","/users", true),
    new Menu("VENDORS","/vendors"),
    new Menu("PRODUCTS","/products")

  ];
  ngOnInit():void{
    this.SSVC.logcheck();
    this.ADMIN=this.SSVC.loggedAdmin;
  }
}
