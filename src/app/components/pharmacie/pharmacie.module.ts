import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacieRoutingModule } from './pharmacie-routing.module';
import {PharmacieSearchComponent} from '@components/pharmacie/pharmacie-search/pharmacie-search.component';
import {PharmacieComponent} from '@components/pharmacie/pharmacie.component';
import {SharedModule} from '@shared/shared.module';
import { AddPharmacieComponent } from './add-pharmacie/add-pharmacie.component';
import { EditPharmacieComponent } from './edit-pharmacie/edit-pharmacie.component';


@NgModule({
  declarations: [PharmacieSearchComponent, PharmacieComponent, AddPharmacieComponent, EditPharmacieComponent],
  imports: [
    CommonModule,
    PharmacieRoutingModule,
    SharedModule
  ]
})
export class PharmacieModule { }
