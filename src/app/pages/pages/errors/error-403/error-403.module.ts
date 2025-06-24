import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error403RoutingModule } from './error-403-routing.module';
import { Error403Component } from './error-403.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [Error403Component],
  imports: [
    CommonModule,
    Error403RoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class Error403Module {
}
