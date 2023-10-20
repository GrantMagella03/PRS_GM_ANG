import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './pages/e404/e404.component';
import { LoginComponent } from './content/user/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VendorlistComponent } from './content/vendor/vendorlist/vendorlist.component';
import { ProductlistComponent } from './content/product/productlist/productlist.component';
import { UserlistComponent } from './content/user/userlist/userlist.component';
import { RequestlistComponent } from './content/request/requestlist/requestlist.component';
import { RequestLineListComponent } from './content/request/request-line-list/request-line-list.component';
import { AddRequestComponent } from './content/request/add-request/add-request.component';

const routes: Routes = [
  {path: "", redirectTo:'/login', pathMatch:"full"},

  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LoginComponent},

  {path: "users", component: UserlistComponent},
  {path: "vendors", component: VendorlistComponent},
  {path: "products", component: ProductlistComponent},
  {path: "requests", component: RequestlistComponent},
  {path: "requests/lines/:id", component: RequestLineListComponent},
  {path: "requests/add", component: AddRequestComponent},
  
  {path: "**", component: E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
