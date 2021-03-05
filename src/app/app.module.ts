import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertComponent } from './alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackEnd } from './Backend/backend';
import { JwtInterceptor } from './Backend/jwt.interceptor';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { PetEntryModule } from './pet-entry/pet-entry.module';
import { HomeModule } from './home/home.module';
import { UserUpdateModule } from './user-update/user-update.module';
import { TestComponentModule } from './test-component/test-component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    RegisterModule,
    PetEntryModule,
    HomeModule,
    UserUpdateModule,
    TestComponentModule,
    BrowserAnimationsModule,
    //AlertModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackEnd,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
