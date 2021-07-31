import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedecinsRoutingModule } from './medecins-routing.module';
import {MedecinsComponent} from '@components/Medecins/medecins.component';
import {CardsComponent} from '@components/Medecins/cards/cards.component';
import {AjouterMedecinComponent} from '@components/Medecins/ajouter-medecin/ajouter-medecin.component';
import {SharedModule} from '@shared/shared.module';
import {ListMedecinsComponent} from '@components/Medecins/list-medecins/list-medecins.component';


@NgModule({
  declarations: [MedecinsComponent, CardsComponent, AjouterMedecinComponent, ListMedecinsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MedecinsRoutingModule
  ]
})
export class MedecinsModule { }
