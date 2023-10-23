import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { systemService } from 'src/app/misc/system.service';
import { Vendor } from '../../vendor/vendor.class';
import { VendorService } from '../../vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  Z:Vendor=new Vendor;
  X:Product=new Product;
  VID:number=0;
  constructor(
    private PSVC: ProductService,
    private VSVC:VendorService,
    private SSVC:systemService,
    private route:ActivatedRoute
  ){}
  ngOnInit():void{
    let id = this.route.snapshot.params["id"];
    this.PSVC.get(id).subscribe({
      next: (res)=>{
        this.X=res;
        this.VID=res.vendorID;
        this.refresh();
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }
  refresh():void{
    let id = this.route.snapshot.params["id"];
    this.VSVC.get(this.VID).subscribe({
      next: (res)=>{
        this.Z=res;
      },
      error: (err)=>{
          console.error(err);
      }
    });
  }
}
