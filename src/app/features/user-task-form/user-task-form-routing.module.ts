import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserTaskFormComponent} from "@features/user-task-form/user-task-form.component";

const routes: Routes = [
  {
    path: ":idTask",
    component: UserTaskFormComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTaskFormRoutingModule { }
