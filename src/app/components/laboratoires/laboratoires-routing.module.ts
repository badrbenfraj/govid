import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LaboratoireHomeComponent} from '@components/laboratoires/laboratoire-home/laboratoire-home.component';

const routes: Routes = [
  {
    path: '',
    component: LaboratoireHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoiresRoutingModule { }
