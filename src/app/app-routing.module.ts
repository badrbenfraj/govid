import { AddMachineComponent } from './components/Machines/add-machine/add-machine.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './core/not-found/not-found.component';
import {ForgotPasswordComponent} from './core/auth/forgot-password/forgot-password.component';
import {AuthGuard} from './core/auth/helpers';
import {LaboratoireListComponent} from './components/laboratoires/laboratoire-list/laboratoire-list.component';
import {LaboratoireDashboardComponent} from './components/laboratoires/laboratoire-dashboard/laboratoire-dashboard.component';
import {ListMedecinsComponent} from './components/Medecins/list-medecins/list-medecins.component';
import {AjouterMedecinComponent} from './components/Medecins/ajouter-medecin/ajouter-medecin.component';
import {Role} from './core/auth/models';
import {AdminComponent} from './components/admin/admin.component';
import {ChooseActionComponent} from './components/Machines/choose-action/choose-action.component';
import {ListeMachineComponent} from './components/Machines/liste-machine/liste-machine.component';
import { LaboratoireHomeComponent } from './components/laboratoires/laboratoire-home/laboratoire-home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./components/home/home.module`).then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import(`@auth/login/login.module`).then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import(`@auth/signup/signup.module`).then((m) => m.SignupModule),
  },
  {
    path: 'reset',
    component: ForgotPasswordComponent,
  },
  {
    path: 'laboratoireHome',
    component: LaboratoireHomeComponent,
    canActivate: [AuthGuard],
   
  },
  {
    path: 'laboratoireDashboard',
    component: LaboratoireDashboardComponent,
    canActivate: [AuthGuard],
  
  },
  {
    path: 'laboratoireHome',
    component: LaboratoireHomeComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]},
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'Machine',
    component: ChooseActionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ListMachines',
    component: ListeMachineComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addMachine',
    component: AddMachineComponent,
    canActivate: [AuthGuard]
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
