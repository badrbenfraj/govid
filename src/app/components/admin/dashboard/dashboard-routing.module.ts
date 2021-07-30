import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./core-chart/core-chart.module').then(m => m.CoreChartModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'users/:id',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'medecin',
        loadChildren: () => import('../../Medecins/medecins.module').then(m => m.MedecinsModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'laboratoire',
        loadChildren: () => import('../../laboratoires/laboratoires.module').then(m => m.LaboratoiresModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'machines',
        loadChildren: () => import('../../Machines/machines.module').then(m => m.MachinesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
