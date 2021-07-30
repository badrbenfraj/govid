import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PharmacieComponent} from '@components/pharmacie/pharmacie.component';

const routes: Routes = [
  {
    path: '',
    component: PharmacieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacieRoutingModule { }
