import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {SharedModule} from '@shared/shared.module';
import { UsersComponent } from './users.component';
import { NewAgentComponent } from './new-agent/new-agent.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [UsersComponent, NewAgentComponent]
})
export class UsersModule { }
