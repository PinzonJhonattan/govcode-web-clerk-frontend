import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListProceduresComponent } from "./list-procedures.component";

const routes: Routes = [
  {
    path: "",
    component: ListProceduresComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProceduresRoutingModule {}
