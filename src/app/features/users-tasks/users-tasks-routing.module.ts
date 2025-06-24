import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersTasksComponent} from "@features/users-tasks/users-tasks.component";

const routes: Routes = [
  {
    path: "",
    component: UsersTasksComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersTasksRoutingModule { }
