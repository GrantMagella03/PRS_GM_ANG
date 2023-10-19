export class Menu{
    display: string = "";
    route: string = "";
    admin:boolean=false;
    constructor(display:string,route:string,admin:boolean=false){
        this.display=display;
        this.route=route;
        this.admin=admin;
    }
}