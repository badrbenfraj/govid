import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';
import {NewAgentComponent} from '@components/admin/dashboard/users/new-agent/new-agent.component';
import {EditAgentComponent} from '@components/admin/dashboard/users/edit-agent/edit-agent.component';
import {ProfileComponent} from '@components/admin/dashboard/users/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./new-agent/new-agent.module').then(m => m.NewAgentModule)
      }
    ]
  },
  {
    path: 'edit/:name',
    component: EditAgentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
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
export class UsersRoutingModule {
}
