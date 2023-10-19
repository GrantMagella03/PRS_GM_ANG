import { Product } from "../product/product.class";
import { request } from "./request.class";

export class RequestLine{
    id:number=0;
    requestID:number=0;
    request:request|null=null
    productID:number=0;
    product:Product|null=null;
    quantity:number=1;
}