import { Component } from '@angular/core';
import { request } from '../request.class';
import { Router } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { UserService } from '../../user/user.service';
import { requestService } from '../request.service';
import { User } from '../../user/user.class';

@Component({
  selector: 'app-requestlist',
  templateUrl: './requestlist.component.html',
  styleUrls: ['./requestlist.component.css']
})
export class RequestlistComponent {
  loggedUsername:string="";
  ADMIN:boolean=false;
  emptyRowHidden:boolean=false;
  createRowHidden:boolean=true;
  editRow:any=null;
  deleteRow:any=null;
  Xs!:request[];
  X:request=new request();
  Ys!:User[];
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
    private RSVC: requestService,
    private USVC: UserService,
    private SSVC:systemService,
    private router: Router
  ){}
  ngOnInit():void{
    this.loggedUsername=this.SSVC.user.username;
    this.ADMIN=this.SSVC.loggedAdmin;
    this.RSVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
      },
      error: (err)=>{
          console.error(err);
      }
    });
    this.USVC.list().subscribe({
      next: (res)=>{
        this.Ys=res
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }

  //SAVE
  createclick(){
    this.X=new request();
    this.X.userID=this.SSVC.user.id;
    this.X.status="NEW";
    this.X.total=0;
    this.emptyRowHidden=true;
    this.createRowHidden=false;
    this.editRow=null;
  }
  saveclick(){
    this.RSVC.create(this.X).subscribe({
      next: (res)=>{
        console.log(res);
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


  //EDIT
  editclick(eRow:any=null){
    this.X=eRow;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=eRow;
  }
  editsaveclick(){
    this.RSVC.change(this.X).subscribe({
      next: (res)=>{
        this.editRow=null;
        this.refresh();
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }


  refresh(){
    this.RSVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
      },
      error: (err)=>{
          console.error(err);
      }
    });
    this.ADMIN=this.SSVC.loggedAdmin;
  }


  //DELETE
  deleteclick(delRow:any=null){
    this.deleteRow=delRow;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=null;
  }
  confirmdeleteclick(){
    this.RSVC.remove(this.deleteRow.id).subscribe({
      next: (res)=>{
        this.deleteRow=null;
        this.refresh();
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }

  //EXTRA
  cancelclick(){
    this.deleteRow=null;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=null;
    this.refresh();
  }
}
