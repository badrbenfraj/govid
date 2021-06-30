import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboratoireDashboardComponent } from './laboratoires/laboratoire-dashboard/laboratoire-dashboard.component';
import { LaboratoireListComponent } from './laboratoires/laboratoire-list/laboratoire-list.component';

const routes: Routes = [
  { path: 'LaboratoireList', component: LaboratoireListComponent },
  { path: 'laboratoireDashboard', component: LaboratoireDashboardComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
 }
