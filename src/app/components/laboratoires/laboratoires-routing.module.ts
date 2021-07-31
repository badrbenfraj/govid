import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LaboratoireHomeComponent} from '@components/laboratoires/laboratoire-home/laboratoire-home.component';
import { LaboratoireDashboardComponent } from './laboratoire-dashboard/laboratoire-dashboard.component';
import { LaboratoireMapComponent } from './laboratoire-map/laboratoire-map.component';

const routes: Routes = [
  {
    path: '',
    component: LaboratoireHomeComponent
  },
  {
    path: 'laboratoireDashboard',
    component: LaboratoireDashboardComponent
  },
  {
    path: 'laboratoireMap',
    component: LaboratoireMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoiresRoutingModule { }
