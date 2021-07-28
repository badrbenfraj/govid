import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LaboratoiresRoutingModule} from './laboratoires-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {LaboratoireHomeComponent} from '@components/laboratoires/laboratoire-home/laboratoire-home.component';
import {LaboratoireListComponent} from '@components/laboratoires/laboratoire-list/laboratoire-list.component';
import {LaboratoireCardComponent} from '@components/laboratoires/laboratoire-card/laboratoire-card.component';
import {LaboratoireDashboardComponent} from '@components/laboratoires/laboratoire-dashboard/laboratoire-dashboard.component';
import {LaboratoireMapComponent} from '@components/laboratoires/laboratoire-map/laboratoire-map.component';
import {RatingLaboratoireComponent} from '@components/laboratoires/rating-laboratoire/rating-laboratoire.component';
import {AgmCoreModule} from '@agm/core';
import {AddLaboComponent} from '@components/laboratoires/add-labo/add-labo.component';
import {SharedModule} from '@shared/shared.module';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    LaboratoireHomeComponent,
    LaboratoireListComponent,
    LaboratoireCardComponent,
    LaboratoireDashboardComponent,
    LaboratoireMapComponent,
    LaboratoireDashboardComponent,
    RatingLaboratoireComponent,
    AddLaboComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    LaboratoiresRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA8izfeQvQZt3XnZlrO6XB9U9WQgQX1OXQ',
      libraries: ['places'],
    }),
  ]
})
export class LaboratoiresModule {
}
