import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportPowerBiComponent} from "@features/report-power-bi/report-power-bi.component";

const routes: Routes = [
  {
    path: "",
    component: ReportPowerBiComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportPowerBiRoutingModule { }
