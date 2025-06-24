import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportPowerBiRoutingModule } from './report-power-bi-routing.module';
import { ReportPowerBiComponent } from './report-power-bi.component';
import {PowerBIEmbedModule} from "powerbi-client-angular";

@NgModule({
  declarations: [
    ReportPowerBiComponent
  ],
  imports: [
    CommonModule,
    ReportPowerBiRoutingModule,
    PowerBIEmbedModule
  ]
})
export class ReportPowerBiModule { }
