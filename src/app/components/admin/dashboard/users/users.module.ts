import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {SharedModule} from '@shared/shared.module';
import { UsersComponent } from './users.component';
import { NewAgentComponent } from './new-agent/new-agent.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [UsersComponent, NewAgentComponent, EditAgentComponent, ProfileComponent]
})
export class UsersModule { }
