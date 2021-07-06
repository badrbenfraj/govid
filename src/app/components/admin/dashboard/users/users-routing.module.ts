import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
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
