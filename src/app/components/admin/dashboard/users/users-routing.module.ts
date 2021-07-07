import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';
import {NewAgentComponent} from '@components/admin/dashboard/users/new-agent/new-agent.component';
import {EditAgentComponent} from '@components/admin/dashboard/users/edit-agent/edit-agent.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'new/:name',
    component: NewAgentComponent
  },
  {
    path: 'edit',
    component: EditAgentComponent
  },
  {
    path: '',
    children: [
      {
        path: 'laboratoire',
        loadChildren: () => import('./laboratory-agent/laboratory-agent.module').then(m => m.LaboratoryAgentModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
