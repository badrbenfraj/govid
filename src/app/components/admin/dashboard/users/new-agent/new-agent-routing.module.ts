import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewAgentComponent} from '@components/admin/dashboard/users/new-agent/new-agent.component';
import {AuthGuard} from '@auth/helpers';

const routes: Routes = [
  {
    path: 'new/:name',
    component: NewAgentComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAgentRoutingModule { }
