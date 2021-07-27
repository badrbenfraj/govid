import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MachinesRoutingModule} from '@components/Machines/machines-routing.module';
import {ListeMachineComponent} from '@components/Machines/liste-machine/liste-machine.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  imports: [
    CommonModule,
    MachinesRoutingModule,
    FormsModule,
    SharedModule,
    DialogModule,

  ],
  declarations: [ListeMachineComponent]
})
export class MachinesModule {
}
