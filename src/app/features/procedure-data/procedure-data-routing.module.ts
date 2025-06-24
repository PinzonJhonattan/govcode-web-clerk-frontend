import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilesProcedureComponent} from "@features/procedure-data/files-procedure/files-procedure.component";

const routes: Routes = [
  {
    path: "documentos",
    component: FilesProcedureComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureDataRoutingModule { }
