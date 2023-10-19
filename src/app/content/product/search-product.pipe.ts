import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.class';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(Xs: Product[],input:string=""): Product[] {
    if(input===""){
      return Xs;
    }
    let SXs:Product[] = [];
    for(let x of Xs){
      if(
        (
          (x.name!==null&&x.name.toLowerCase().includes(input.toLowerCase())) ||
          (x.partNbr!==null&&x.partNbr.toLowerCase().includes(input.toLowerCase()))        
        ) 
      ){
        SXs.push(x);
      }
    }
    return SXs;
  }
}
