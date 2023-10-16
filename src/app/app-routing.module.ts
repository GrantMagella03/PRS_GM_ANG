import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './pages/e404/e404.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: "", redirectTo:'/home', pathMatch:"full"},
  
  {path: "home", component: LoginComponent },
  
  {path: "**", component: E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
