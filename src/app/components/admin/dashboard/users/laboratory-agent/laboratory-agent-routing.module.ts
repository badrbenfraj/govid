import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LaboratoryAgentComponent} from '@components/admin/dashboard/users/laboratory-agent/laboratory-agent.component';
import {NewLaboratoryAgentComponent} from '@components/admin/dashboard/users/laboratory-agent/new-laboratory-agent/new-laboratory-agent.component';

const routes: Routes = [
  {
    path: '',
    component: LaboratoryAgentComponent
  },
  {
    path: 'new',
    component: NewLaboratoryAgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryAgentRoutingModule { }
