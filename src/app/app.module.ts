import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { TopHeaderComponent } from './components/home/top-header/top-header.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import {AuthService} from './core/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    TopHeaderComponent,
    ForgotPasswordComponent,
  ],
  imports: [
  //  MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA8izfeQvQZt3XnZlrO6XB9U9WQgQX1OXQ',
      libraries: ['places']
    }),
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
