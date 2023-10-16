import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr:any[], column:string="id", asc:boolean=true): any[] {
    if(typeof arr === "undefined"|| typeof arr === null){
      return arr;
    }
    const compareFn = (a:any,b:any):number =>{
      let x = typeof a[column]==="number"? a[column]:a[column].toString().toLowerCase();
      let y = typeof b[column]==="number"? b[column]:b[column].toString().toLowerCase();
      if(x===y) {return 0;}
      if(asc){return (x>y)?1:-1;}else{return (x<y)?1:-1;}
    }
    return arr.sort(compareFn);
  }

}
