import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrtMorrisRoutingModule } from './crt-morris-routing.module';
import { CrtMorrisComponent } from './crt-morris.component';
import {MorrisJsModule} from 'angular-morris-js';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CrtMorrisRoutingModule,
    SharedModule,
    MorrisJsModule
  ],
  declarations: [CrtMorrisComponent]
})
export class CrtMorrisModule { }
