import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';
import {LaboratoireDashboardComponent} from '@components/laboratoires/laboratoire-dashboard/laboratoire-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'laboratoire',
    component: LaboratoireDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
