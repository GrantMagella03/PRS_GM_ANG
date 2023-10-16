import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './pages/e404/e404.component';
import { LoginComponent } from './content/user/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VendorlistComponent } from './content/vendor/vendorlist/vendorlist.component';

const routes: Routes = [
  {path: "", redirectTo:'/login', pathMatch:"full"},

  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},

  {path: "vendors", component: VendorlistComponent},
  
  {path: "**", component: E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
