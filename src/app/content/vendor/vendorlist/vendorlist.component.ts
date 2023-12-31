import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';

@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.css']
})
export class VendorlistComponent {
  LADMIN:boolean=false;
  emptyRowHidden:boolean=false;
  createRowHidden:boolean=true;
  editRow:any=null;
  deleteRow:any=null;
  Xs!:Vendor[];
  X:Vendor=new Vendor;
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
    private VSVC: VendorService,
    private SSVC:systemService,
    private router: Router
  ){}
  ngOnInit():void{
    this.VSVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
      },
      error: (err)=>{
          console.error(err);
      }
    });
    this.LADMIN=this.SSVC.loggedAdmin;
  }
  createclick(){
    this.X=new Vendor();
    this.emptyRowHidden=true;
    this.createRowHidden=false;
    this.editRow=null;
  }
  saveclick(){
    this.VSVC.create(this.X).subscribe({
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
  editclick(eRow:any=null){
    this.X=eRow;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=eRow;
  }
  editsaveclick(){
    this.VSVC.change(this.X).subscribe({
      next: (res)=>{
        this.editRow=null;
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }
  refresh(){
    this.VSVC.list().subscribe({
      next: (res)=>{
        this.Xs=res
      },
      error: (err)=>{
          console.error(err);
      }
    });
    this.LADMIN=this.SSVC.loggedAdmin;
  }
  deleteclick(delRow:any=null){
    this.deleteRow=delRow;
    this.emptyRowHidden=false;
    this.createRowHidden=true;
    this.editRow=null;
  }
  confirmdeleteclick(){
    this.VSVC.remove(this.deleteRow.id).subscribe({
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
