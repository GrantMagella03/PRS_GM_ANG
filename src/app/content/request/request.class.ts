import { User } from "../user/user.class";
import { RequestLine } from "./requestline.class";

export class request{
    id:number=0;
    description:string="";
    justification:string="";
    rejectionReason:string|null=null;
    deliveryMode:string="Pickup";
    status:string="NEW";
    total:number=0;
    userID:number=0;
    user:User|null=null;
    
    requestLines:RequestLine[]| null=null;
}