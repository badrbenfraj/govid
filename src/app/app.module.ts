import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { TopHeaderComponent } from './components/home/top-header/top-header.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { JwtInterceptor, ErrorInterceptor } from './core/auth/helpers';

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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
