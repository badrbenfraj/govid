import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PharmacieComponent} from '@components/pharmacie/pharmacie.component';
import {AddPharmacieComponent} from '@components/pharmacie/add-pharmacie/add-pharmacie.component';
import { EditPharmacieComponent } from './edit-pharmacie/edit-pharmacie.component';

const routes: Routes = [
  {
    path: '',
    component: PharmacieComponent
  },
  {
    path: 'new',
    component: AddPharmacieComponent
  },
  {
    path: ':id/edit',
    component: EditPharmacieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacieRoutingModule { }
