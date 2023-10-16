import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.css']
})
export class VendorlistComponent {
  emptyRowHidden:boolean=false;
  editRowHidden:boolean=true;
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
  }
  createclick(){
    this.emptyRowHidden=true;
    this.editRowHidden=false;
  }
  saveclick(){
    this.VSVC.create(this.X).subscribe({
      next: (res)=>{
        console.log(res);
        this.emptyRowHidden=false;
        this.editRowHidden=true;
        this.refresh();
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
  }
}
