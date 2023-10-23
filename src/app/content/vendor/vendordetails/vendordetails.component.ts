import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { ProductService } from '../../product/product.service';
import { RequestLineService } from '../../request/requestline.service';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor.class';
import { Product } from '../../product/product.class';

@Component({
  selector: 'app-vendordetails',
  templateUrl: './vendordetails.component.html',
  styleUrls: ['./vendordetails.component.css']
})
export class VendordetailsComponent {
  ADMIN:boolean=false;
  REVIEWER:boolean=false;
  emptyRowHidden:boolean=false;
  createRowHidden:boolean=true;
  editRow:any=null;
  deleteRow:any=null;
  Z:Vendor=new Vendor;
  Xs!:Product[];
  X:Product=new Product;
  locale:string = 'en';
  searchIN:string='';
  columnIN:string = 'id';
  ascIN:boolean=true;
  constructor(
    private RLSVC: RequestLineService,
    private PSVC: ProductService,
    private VSVC:VendorService,
    private SSVC:systemService,
    private router: Router,
    private route:ActivatedRoute
  ){}
  sortOrder(column:string):void{
    if(column === this.columnIN){this.ascIN = !this.ascIN;return}
    this.columnIN=column;
    this.ascIN=true;
  }
  ngOnInit():void{
    this.ADMIN=this.SSVC.loggedAdmin;
    this.REVIEWER=this.SSVC.REVIEWER;
    this.refresh();
  }
  exclude(Ys:Product[]) {
    let SXs:Product[] = [];
    for(let x of Ys){
      if(
        x.vendorID===this.Z.id
      ){
        SXs.push(x);
      }
    }
    return SXs;
  }
  refresh():void{
    let id = this.route.snapshot.params["id"];
    this.VSVC.get(id).subscribe({
      next: (res)=>{
        this.Z=res
        this.X.vendorID=this.Z.id;
      },
      error: (err)=>{
          console.error(err);
      }
    });
    this.ADMIN=this.SSVC.loggedAdmin;
    this.PSVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
        this.Xs=this.exclude(this.Xs);
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }

 //SAVE
 createclick(){
  this.X=new Product();
  this.X.vendorID=this.Z.id;
  this.X.unit="Each"
  this.emptyRowHidden=true;
  this.createRowHidden=false;
  this.editRow=null;
}
saveclick(){
  console.log(this.X);
  
  this.PSVC.create(this.X).subscribe({
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
  this.PSVC.change(this.X).subscribe({
    next: (res)=>{
      this.editRow=null;
      this.refresh();
    },
    error: (err)=>{
        console.error(err);
    }
  });
}
deleteclick(delRow:any=null){
  this.deleteRow=delRow;
  this.emptyRowHidden=false;
  this.createRowHidden=true;
  this.editRow=null;
}
confirmdeleteclick(){
  this.PSVC.remove(this.deleteRow.id).subscribe({
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
