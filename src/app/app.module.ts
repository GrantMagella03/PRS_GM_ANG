import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppinitService } from './misc/appinit.service';
import { LoginComponent } from './pages/login/login.component';
import { E404Component } from './pages/e404/e404.component';

export const startupSVC = (appinit:AppinitService) =>{
  return () => appinit.getSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    E404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
