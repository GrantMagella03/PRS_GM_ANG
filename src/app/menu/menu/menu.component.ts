import { Component } from '@angular/core';
import { systemService } from 'src/app/misc/system.service';
import { Menu } from '../menu.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(
    private SSVC: systemService,
  ){}
  menus: Menu[] = [
    new Menu("HOME", "/home"),
    new Menu("VENDORS","/vendors")
  ];
  ngOnInit():void{
    this.SSVC.logcheck();
  }
}
