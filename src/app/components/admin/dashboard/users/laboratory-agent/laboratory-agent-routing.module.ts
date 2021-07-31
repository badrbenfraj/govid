import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LaboratoryAgentComponent} from '@components/admin/dashboard/users/laboratory-agent/laboratory-agent.component';

const routes: Routes = [
  {
    path: ':name',
    component: LaboratoryAgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryAgentRoutingModule { }
