import { Pipe, PipeTransform } from '@angular/core';
import { request } from './request.class';

@Pipe({
  name: 'searchrequest'
})
export class SearchrequestPipe implements PipeTransform {

  transform(Xs: request[],input:string=""): request[] {
    if(input===""){
      return Xs;
    }
    let SXs:request[] = [];
    for(let x of Xs){
      if(
        (x.description!==null&&x.description.toLowerCase().includes(input.toLowerCase())) ||
        (x.user?.username!==null&&x.user?.username.toLowerCase().includes(input.toLowerCase()))
      ){
        SXs.push(x);
      }
    }
    return SXs;
  }
}
