import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { VendorService } from '../../vendor/vendor.service';
import { Vendor } from '../../vendor/vendor.class';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  ADMIN:boolean=false;
  emptyRowHidden:boolean=false;
  createRowHidden:boolean=true;
  editRow:any=null;
  deleteRow:any=null;
  Xs!:Product[];
  X:Product=new Product;
  Ys!:Vendor[];
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
    private PSVC: ProductService,
    private VSVC: VendorService,
    private SSVC:systemService,
    private router: Router
  ){}
  ngOnInit():void{
    this.ADMIN=this.SSVC.loggedAdmin;
    this.PSVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
      },
      error: (err)=>{
          console.error(err);
      }
    });
    this.VSVC.list().subscribe({
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
    this.X=new Product();
    this.X.unit="Each"
    this.emptyRowHidden=true;
    this.createRowHidden=false;
    this.editRow=null;
  }
  saveclick(){
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


  refresh(){
    this.PSVC.list().subscribe({
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
