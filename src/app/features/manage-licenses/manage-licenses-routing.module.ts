import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedUsersComponent } from './authorized-users/authorized-users.component';
import { CreateAuthorizedUsersComponent } from './authorized-users/create-authorized-users/create-authorized-users.component';

const routes: Routes = [
  {
    path: 'authorized-users',
    component: AuthorizedUsersComponent,
  },
  {
    path: 'authorized-users/edit/:id',
    component: CreateAuthorizedUsersComponent,
  },
  {
    path: 'authorized-users/review/:id',
    component: CreateAuthorizedUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageLicensesRoutingModule { }
