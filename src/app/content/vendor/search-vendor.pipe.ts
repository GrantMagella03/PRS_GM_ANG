import { Pipe, PipeTransform } from '@angular/core';
import { Vendor } from './vendor.class';

@Pipe({
  name: 'searchVendor'
})
export class SearchVendorPipe implements PipeTransform {

  transform(Xs: Vendor[],input:string=""): Vendor[] {
    if(input===""){
      return Xs;
    }
    let SXs:Vendor[] = [];
    for(let x of Xs){
      if(
        (x.email!==null&&x.email.toLowerCase().includes(input.toLowerCase())) 
      ){
        SXs.push(x);
      }
    }
    return SXs;
  }
}
