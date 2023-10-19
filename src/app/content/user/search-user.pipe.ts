import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.class';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(Xs: User[],input:string=""): User[] {
    if(input===""){
      return Xs;
    }
    let SXs:User[] = [];
    for(let x of Xs){
      if(
        (x.username!==null&&x.username.toLowerCase().includes(input.toLowerCase())) ||
        (x.firstname!==null&&x.firstname.toLowerCase().includes(input.toLowerCase())) ||
        (x.lastname!==null&&x.lastname.toLowerCase().includes(input.toLowerCase())) ||
        (x.email!==null&&x.email.toLowerCase().includes(input.toLowerCase()))
      ){
        SXs.push(x);
      }
    }
    return SXs;
  }
}
