import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppinitService } from './misc/appinit.service';
import { LoginComponent } from './content/user/login/login.component';
import { E404Component } from './pages/e404/e404.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './menu/menu/menu.component';
import { VendorlistComponent } from './content/vendor/vendorlist/vendorlist.component';
import { SortPipe } from './misc/sort.pipe';
import { SearchVendorPipe } from './content/vendor/search-vendor.pipe';
import { LogoutComponent } from './content/user/logout/logout.component';
import { ProductlistComponent } from './content/product/productlist/productlist.component';
import { SearchProductPipe } from './content/product/search-product.pipe';
import { UserlistComponent } from './content/user/userlist/userlist.component';
import { SearchUserPipe } from './content/user/search-user.pipe';
import { RequestlistComponent } from './content/request/requestlist/requestlist.component';
import { SearchrequestPipe } from './content/request/search-request.pipe';
import { RequestLineListComponent } from './content/request/request-line-list/request-line-list.component';
import { AddRequestComponent } from './content/request/add-request/add-request.component';
import { VendordetailsComponent } from './content/vendor/vendordetails/vendordetails.component';
import { ProductdetailsComponent } from './content/product/productdetails/productdetails.component';
import { UserdetailsComponent } from './content/user/userdetails/userdetails.component';

export const startupSVC = (appinit:AppinitService) =>{
  return () => appinit.getSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    E404Component,
    HomeComponent,
    MenuComponent,
    VendorlistComponent,
    SortPipe,
    SearchVendorPipe,
    LogoutComponent,
    ProductlistComponent,
    SearchProductPipe,
    UserlistComponent,
    SearchUserPipe,
    RequestlistComponent,
    SearchrequestPipe,
    RequestLineListComponent,
    AddRequestComponent,
    VendordetailsComponent,
    ProductdetailsComponent,
    UserdetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AppinitService, {
      provide: APP_INITIALIZER,
      useFactory: startupSVC,
      deps:[AppinitService],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
