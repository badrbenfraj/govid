import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacieRoutingModule } from './pharmacie-routing.module';
import {PharmacieSearchComponent} from '@components/pharmacie/pharmacie-search/pharmacie-search.component';
import {PharmacieComponent} from '@components/pharmacie/pharmacie.component';


@NgModule({
  declarations: [PharmacieSearchComponent, PharmacieComponent],
  imports: [
    CommonModule,
    PharmacieRoutingModule
  ]
})
export class PharmacieModule { }
