import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './core/not-found/not-found.component';
import {ForgotPasswordComponent} from './core/auth/forgot-password/forgot-password.component';
import {AuthGuard} from './core/auth/helpers';
import {LaboratoireDashboardComponent} from './components/laboratoires/laboratoire-dashboard/laboratoire-dashboard.component';
import {Role} from './core/auth/models';
import {AdminComponent} from './components/admin/admin.component';
import {LaboratoireHomeComponent} from './components/laboratoires/laboratoire-home/laboratoire-home.component';
import {LaboratoireMapComponent} from './components/laboratoires/laboratoire-map/laboratoire-map.component';

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
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
