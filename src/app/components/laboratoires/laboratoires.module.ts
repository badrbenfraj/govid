import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { LaboratoireHomeComponent } from './laboratoire-home/laboratoire-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsLaboComponent } from './comments-labo/comments-labo.component';
import { LaboratoiresRoutingModule } from './laboratoires-routing/laboratoires-routing.module';
import { LaboratoireListComponent } from './laboratoire-list/laboratoire-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
   // LaboratoiresRoutingModule   
  ]
})
export class LaboratoiresModule { }
