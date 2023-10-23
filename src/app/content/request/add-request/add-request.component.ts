import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { ProductService } from '../../product/product.service';
import { requestService } from '../request.service';
import { RequestLineService } from '../requestline.service';
import { Product } from '../../product/product.class';
import { request } from '../request.class';
import { RequestLine } from '../requestline.class';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent {
  X:RequestLine=new RequestLine();
  Ys!:Product[];
  Z:request=new request;
  loggedUsername:string="";
  creatingReq:boolean=true;
  emptyRowHidden:boolean=false;
  firstcreateRowHidden:boolean=false;
  createRowHidden:boolean=true;
  editRow:any=null;
  deleteRow:any=null;
  id:number=0;
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
    this.PSVC.list().subscribe({
      next: (res)=>{
        this.Ys=res
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }
  refresh(){
    this.RSVC.get(this.id).subscribe({
      next: (res)=>{
        this.Z = res;
      },
      error: (err)=>{
        console.error(err);
      }
    });
  }
  SaveRequestClick(){
    this.Z.userID=this.SSVC.user.id;
    this.RSVC.create(this.Z).subscribe({
      next: (res)=>{
        this.Z=res;
        this.id=this.Z.id;
        this.firstcreateRowHidden=true;
        this.emptyRowHidden=true;
        this.createRowHidden=false;
        this.refresh();
      },
      error: (err)=>{
        console.error(err);
      }
    });
  }

  createclick(){
    this.X=new RequestLine();
    this.X.requestID=this.id;
    this.emptyRowHidden=true;
    this.createRowHidden=false;
    this.editRow=null;
  }
  saveclick(){
    this.X.requestID=this.id;
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
    this.X=eRow;
    this.X.requestID=this.id;
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
    this.refresh();
  }
}
