import { PieChartMachineComponent } from './pie-chart-machine/pie-chart-machine.component';
import { MachineHistoryComponent } from './machine-history/machine-history.component';
import { AddMachineComponent } from './add-machine/add-machine.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListeMachineComponent} from '@components/Machines/liste-machine/liste-machine.component';

const routes: Routes = [
  {
    path: '',
    component: ListeMachineComponent
  },
  {
    path: 'add',
    component: AddMachineComponent
  },
  {
    path: 'history',
    component: MachineHistoryComponent
  },
  {
    path: 'stat',
    component: PieChartMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachinesRoutingModule { }
