import { MachineHistoryComponent } from './machine-history/machine-history.component';
import { AddMachineComponent } from './add-machine/add-machine.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MachinesRoutingModule} from '@components/Machines/machines-routing.module';
import {ListeMachineComponent} from '@components/Machines/liste-machine/liste-machine.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import { PieChartMachineComponent } from './pie-chart-machine/pie-chart-machine.component';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';




@NgModule({
  imports: [
    CommonModule,
    MachinesRoutingModule,
    FormsModule,
    SharedModule,
    DialogModule,
    ChartModule,
    CardModule

  ],
  declarations: [ListeMachineComponent, AddMachineComponent, MachineHistoryComponent, PieChartMachineComponent]
})
export class MachinesModule {
}
