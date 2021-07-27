import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListeMachineComponent} from '@components/Machines/liste-machine/liste-machine.component';

const routes: Routes = [
  {
    path: '',
    component: ListeMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachinesRoutingModule { }
