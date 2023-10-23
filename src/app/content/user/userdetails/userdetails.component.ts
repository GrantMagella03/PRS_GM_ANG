import { Component } from '@angular/core';
import { requestService } from '../../request/request.service';
import { UserService } from '../user.service';
import { RequestLineService } from '../../request/requestline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { User } from '../user.class';
import { request } from '../../request/request.class';
import { RequestLine } from '../../request/requestline.class';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {
  ADMIN:boolean=false;
  REVIEWER:boolean=false;
  RemptyRowHidden:boolean=false;
  RcreateRowHidden:boolean=true;
  ReditRow:any=null;
  RdeleteRow:any=null;

  SelRID:number=0;
  IemptyRowHidden:boolean=false;
  IcreateRowHidden:boolean=true;
  IeditRow:any=null;
  IdeleteRow:any=null;
  Z:User=new User;
  Xs!:request[];
  X:request=new request;
  Ys!:RequestLine[];
  Y:RequestLine=new RequestLine;
  Is!:Product[];
  RsearchIN:string='';
  RcolumnIN:string = 'id';
  RascIN:boolean=true;
  IsearchIN:string='';
  IcolumnIN:string = 'id';
  IascIN:boolean=true;
  constructor(
    private RLSVC: RequestLineService,
    private RSVC: requestService,
    private USVC:UserService,
    private SSVC:systemService,
    private router: Router,
    private route:ActivatedRoute,
    private PSVC:ProductService,
  ){}
  RsortOrder(column:string):void{
    if(column === this.RcolumnIN){this.RascIN = !this.RascIN;return}
    this.RcolumnIN=column;
    this.RascIN=true;
  }
  IsortOrder(column:string):void{
    if(column === this.IcolumnIN){this.IascIN = !this.IascIN;return}
    this.IcolumnIN=column;
    this.IascIN=true;
  }
  ngOnInit():void{
    this.ADMIN=this.SSVC.loggedAdmin;
    this.REVIEWER=this.SSVC.REVIEWER;
    this.refresh();
  }
  exclude(Xs:request[]) {
    let SXs:request[] = [];
    for(let x of Xs){
      if(
        x.userID===this.Z.id
      ){
        SXs.push(x);
      }
    }
    return SXs;
  }
  refresh():void{
    let id = this.route.snapshot.params["id"];
    this.USVC.get(id).subscribe({
      next: (res)=>{
        this.Z=res
      },
      error: (err)=>{
        console.error(err);
      }
    });
    this.ADMIN=this.SSVC.loggedAdmin;
    this.RSVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
        this.Xs=this.exclude(this.Xs);
      },
      error: (err)=>{
          console.error(err);
      }
    });
    this.PSVC.list().subscribe({
      next: (res)=>{
        this.Is=res;
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }

 //SAVE
Rcreateclick(){
  this.X=new request();
  this.X.userID=this.Z.id;
  this.RemptyRowHidden=true;
  this.RcreateRowHidden=false;
  this.ReditRow=null;
}
Rsaveclick(){
  this.RSVC.create(this.X).subscribe({
    next: (res)=>{
      console.log(res);
      this.RemptyRowHidden=false;
      this.RcreateRowHidden=true;
      this.refresh();
    },
    error: (err)=>{
      //console.log(this.X);
      
      console.error(err);
    }
  });
  
}


//EDIT
Reditclick(eRow:any=null){
  this.X=eRow;
  this.RemptyRowHidden=false;
  this.RcreateRowHidden=true;
  this.ReditRow=eRow;
}
Reditsaveclick(){
  this.RSVC.change(this.X).subscribe({
    next: (res)=>{
      this.ReditRow=null;
      this.refresh();
    },
    error: (err)=>{
        console.error(err);
    }
  });
}
Rdeleteclick(delRow:any=null){
  this.RdeleteRow=delRow;
  this.RemptyRowHidden=false;
  this.RcreateRowHidden=true;
  this.ReditRow=null;
}
Rconfirmdeleteclick(){
  this.RSVC.remove(this.RdeleteRow.id).subscribe({
    next: (res)=>{
      this.RdeleteRow=null;
      this.refresh();
    },
    error: (err)=>{
        console.error(err);
    }
  });
}

//EXTRA
Rcancelclick(){
  this.RdeleteRow=null;
  this.RemptyRowHidden=false;
  this.RcreateRowHidden=true;
  this.ReditRow=null;
  this.refresh();
}




//ReqLine STUFF HERE

 //SAVE
Icreateclick(X:number){
  this.Y=new RequestLine();
  this.Y.requestID=X  
  this.IemptyRowHidden=true;
  this.IcreateRowHidden=false;
  this.IeditRow=null;
}
Isaveclick(){ 
  this.RLSVC.create(this.Y).subscribe({
    next: (res)=>{
      console.log(res);
      this.IemptyRowHidden=false;
      this.IcreateRowHidden=true;
      this.Irefresh();
    },
    error: (err)=>{
      //console.log(this.X);
      
      console.error(err);
    }
  });
  
}


//EDIT
Ieditclick(eRow:any=null){
  this.Y=eRow;
  this.IemptyRowHidden=false;
  this.IcreateRowHidden=true;
  this.IeditRow=eRow;
}
Ieditsaveclick(){
  this.RLSVC.change(this.Y).subscribe({
    next: (res)=>{
      this.IeditRow=null;
      this.Irefresh();
    },
    error: (err)=>{
        console.error(err);
    }
  });
}
Ideleteclick(delRow:any=null){
  this.IdeleteRow=delRow;
  this.IemptyRowHidden=false;
  this.IcreateRowHidden=true;
  this.IeditRow=null;
}
Iconfirmdeleteclick(){
  this.RLSVC.remove(this.IdeleteRow.id).subscribe({
    next: (res)=>{
      this.IdeleteRow=null;
      this.Irefresh();
    },
    error: (err)=>{
        console.error(err);
    }
  });
}

//EXTRA
Icancelclick(){
  this.IdeleteRow=null;
  this.IemptyRowHidden=false;
  this.IcreateRowHidden=true;
  this.IeditRow=null;
  this.Irefresh();
}


SelectDetail(IN:number){
  this.SelRID=IN;
  this.RSVC.get(IN).subscribe({
    next: (res)=>{
      this.Icancelclick();
      this.Ys=res.requestLines!;
    },
    error: (err)=>{
      console.error(err);
    }
  });
}
Irefresh(){
  this.RSVC.get(this.SelRID).subscribe({
    next: (res)=>{
      this.Ys=res.requestLines!;
    },
    error: (err)=>{
      console.error(err);
    }
  });
}
}
