import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
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
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaboratoireListComponent } from './laboratoires/laboratoire-list/laboratoire-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LaboratoireCardComponent } from './laboratoires/laboratoire-card/laboratoire-card.component';
import { LaboratoireDashboardComponent } from './laboratoires/laboratoire-dashboard/laboratoire-dashboard.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {DialogModule, Dialog} from 'primeng/dialog'
import { LaboratoireMapComponent } from './laboratoires/laboratoire-map/laboratoire-map.component';
import { RatingLaboratoireComponent } from './laboratoires/rating-laboratoire/rating-laboratoire.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './laboratoires/search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
    LaboratoireListComponent,
    NavBarComponent,
    LaboratoireCardComponent,
    LaboratoireDashboardComponent,
    LaboratoireMapComponent,
    RatingLaboratoireComponent,
    SearchBarComponent,
 
    
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
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
   DialogModule,
   NgbModule,
   MatFormFieldModule,
   MatInputModule
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
