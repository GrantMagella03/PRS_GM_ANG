import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  LOGGED:number=0;
  ADMIN:boolean=false;
  emptyRowHidden:boolean=false;
  createRowHidden:boolean=true;
  editRow:any=null;
  deleteRow:any=null;
  Xs!:User[];
  X:User=new User;
  locale:string = 'en';
  searchIN:string='';
  columnIN:string = 'id';
  ascIN:boolean=true;
  sortOrder(column:string):void{
    if(column === this.columnIN){this.ascIN = !this.ascIN;return}
    this.columnIN=column;
    this.ascIN=true;
  }
  constructor(
    private USVC: UserService,
    private SSVC:systemService,
    private router: Router
  ){}
  ngOnInit():void{
    this.USVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
      },
      error: (err)=>{
          console.error(err);
      }
    });
    this.ADMIN=this.SSVC.loggedAdmin;
    this.LOGGED=this.SSVC.user.id;
  }
  createclick(){
    this.X=new User();
    this.emptyRowHidden=true;
    this.createRowHidden=false;
    this.editRow=null;
  }
  saveclick(){
    this.USVC.create(this.X).subscribe({
      next: (res)=>{
        //console.log(res);
        this.emptyRowHidden=false;
        this.createRowHidden=true;
        this.refresh();
      },
      error: (err)=>{
        //console.log(this.X);
        
        console.error(err);
      }
    });
    
  }
  editclick(eRow:any=null){
    this.X=eRow;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=eRow;
  }
  editsaveclick(){
    this.USVC.change(this.X).subscribe({
      next: (res)=>{
        this.editRow=null;
      },
      error: (err)=>{
        console.error(err);
      }
    });
  }
  refresh(){
    this.USVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
      },
      error: (err)=>{
        console.error(err);
      }
    });
    this.ADMIN=this.SSVC.loggedAdmin;
  }
  deleteclick(delRow:any=null){
    this.deleteRow=delRow;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=null;
  }
  confirmdeleteclick(){
    this.USVC.remove(this.deleteRow.id).subscribe({
      next: (res)=>{
        this.deleteRow=null;
        this.refresh();
      },
      error: (err)=>{
        console.error(err);
      }
    });
  }
  cancelclick(){
    this.deleteRow=null;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=null;
    this.refresh();
  }
}
