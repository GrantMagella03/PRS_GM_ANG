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
    SortPipe
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
