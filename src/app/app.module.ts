import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './laboratoires/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { LaboratoireCardComponent } from './laboratoires/laboratoire-card/laboratoire-card.component';
import { LaboratoireListComponent } from './laboratoires/laboratoire-list/laboratoire-list.component';
import {MatIconModule} from '@angular/material/icon';
import { LaboratoireDashboardComponent } from './laboratoires/laboratoire-dashboard/laboratoire-dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LaboratoireCardComponent,
    LaboratoireListComponent,
    LaboratoireDashboardComponent,
    NavBarComponent
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
