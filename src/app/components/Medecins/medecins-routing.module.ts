import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedecinsComponent} from '@components/Medecins/medecins.component';
import {AjouterMedecinComponent} from '@components/Medecins/ajouter-medecin/ajouter-medecin.component';
import {ListMedecinsComponent} from '@components/Medecins/list-medecins/list-medecins.component';

const routes: Routes = [
  {
    path: 'list-medecin',
    component: ListMedecinsComponent
  },
  {
    path: 'new',
    component: AjouterMedecinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedecinsRoutingModule { }
