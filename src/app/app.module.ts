import {AgmCoreModule} from '@agm/core';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundComponent} from '@core/not-found/not-found.component';
import {HomeComponent} from '@components/home/home.component';
import {ForgotPasswordComponent} from '@auth/forgot-password/forgot-password.component';
import {JwtInterceptor, ErrorInterceptor} from '@auth/helpers';

import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule, Dialog} from 'primeng/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NavigationItem} from '@components/admin/navigation/navigation';
import {SharedModule} from './shared/shared.module';
import {CommonModule, DatePipe} from '@angular/common';
import {AdminComponent} from './components/admin/admin.component';
import {NavigationComponent} from './components/admin/navigation/navigation.component';
import {NavLogoComponent} from './components/admin/navigation/nav-logo/nav-logo.component';
import {NavContentComponent} from './components/admin/navigation/nav-content/nav-content.component';
import {NavGroupComponent} from './components/admin/navigation/nav-content/nav-group/nav-group.component';
import {NavCollapseComponent} from './components/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import {NavItemComponent} from './components/admin/navigation/nav-content/nav-item/nav-item.component';
import {NavBarComponent} from './components/admin/nav-bar/nav-bar.component';
import {NavLeftComponent} from './components/admin/nav-bar/nav-left/nav-left.component';
import {NavSearchComponent} from './components/admin/nav-bar/nav-left/nav-search/nav-search.component';
import {NavRightComponent} from './components/admin/nav-bar/nav-right/nav-right.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    ForgotPasswordComponent,
    AdminComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA8izfeQvQZt3XnZlrO6XB9U9WQgQX1OXQ',
      libraries: ['places']
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    NavigationItem,
    DatePipe
  ],
  exports: [
    SharedModule,
    CommonModule,
    BrowserModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
