import { Component } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { RequestLineService } from '../requestline.service';
import { RequestLine } from '../requestline.class';
import { Product } from '../../product/product.class';
import { request } from '../request.class';
import { requestService } from '../request.service';

@Component({
  selector: 'app-Request-line-list',
  templateUrl: './Request-line-list.component.html',
  styleUrls: ['./Request-line-list.component.css']
})
export class RequestLineListComponent {
  loggedUsername:string="";
  ADMIN:boolean=false;
  REVIEWER:boolean=false;
  emptyRowHidden:boolean=false;
  createRowHidden:boolean=true;
  rejecting:boolean=false;
  editRow:any=null;
  deleteRow:any=null;
  //Xs!:RequestLine[];
  X:RequestLine=new RequestLine();
  Ys!:Product[];
  Z:request=new request;
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
    private RLSVC: RequestLineService,
    private PSVC: ProductService,
    private RSVC:requestService,
    private SSVC:systemService,
    private router: Router,
    private route:ActivatedRoute
  ){}
  ngOnInit():void{
    this.loggedUsername=this.SSVC.user.username;
    this.ADMIN=this.SSVC.loggedAdmin;
    this.REVIEWER=this.SSVC.REVIEWER;
    this.refresh();
    this.PSVC.list().subscribe({
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
    let id = this.route.snapshot.params["id"];
    this.X=new RequestLine();
    this.X.requestID=id;
    this.emptyRowHidden=true;
    this.createRowHidden=false;
    this.editRow=null;
  }
  saveclick(){
    this.RLSVC.create(this.X).subscribe({
      next: (res)=>{
        console.log(res);
        this.emptyRowHidden=false;
        this.createRowHidden=true;
        this.refresh();
      },
      error: (err)=>{
        console.log(this.X);
        console.error(err);
      }
    });
    
  }


  //EDIT
  editclick(eRow:any=null){
    let id = this.route.snapshot.params["id"];
    this.X=eRow;
    this.X.requestID=id;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=eRow;
  }
  editsaveclick(){
    this.RLSVC.change(this.X).subscribe({
      next: (res)=>{
        this.editRow=null;
        this.refresh();
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }


  refresh():void{
    let id = this.route.snapshot.params["id"];
    this.RSVC.get(id).subscribe({
      next: (res)=>{
        this.Z=res
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
    this.RLSVC.remove(this.deleteRow.id).subscribe({
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
    this.rejecting=false;
    this.refresh();
  }
  //reviewing
  REVIEWclick(){
    let id = this.route.snapshot.params["id"];
    this.Z.rejectionReason=null;
    this.RSVC.review(id,this.Z).subscribe({
      next: (res)=>{
        this.Z=res
        this.refresh();
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }
  APPROVEclick(){
    let id = this.route.snapshot.params["id"];
    this.Z.rejectionReason=null;
    this.RSVC.approve(id,this.Z).subscribe({
      next: (res)=>{
        this.Z=res
        this.refresh();
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }
  REJECTclick(){
    this.cancelclick();
    this.rejecting=true;

  }
  ConfirmREJECTclick(){
    let id = this.route.snapshot.params["id"];
    this.RSVC.reject(id,this.Z).subscribe({
      next: (res)=>{
        this.Z=res
        this.rejecting=false;
        this.refresh();
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }
}
