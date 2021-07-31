import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryAgentRoutingModule } from './laboratory-agent-routing.module';
import {LaboratoryAgentComponent} from '@components/admin/dashboard/users/laboratory-agent/laboratory-agent.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [LaboratoryAgentComponent],
  imports: [
    CommonModule,
    LaboratoryAgentRoutingModule,
    SharedModule
  ]
})
export class LaboratoryAgentModule { }
