import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUsersTabsComponent } from './manage-users-tabs/manage-users-tabs.component';
import {ManageRolesComponent} from "@features/manage-users/manage-roles/manage-roles.component";
import {ManageGroupsComponent} from "@features/manage-users/manage-groups/manage-groups.component";
import {UsersFormComponent} from "@features/manage-users/manage-users-tabs/users-form/users-form.component";
import requiredRouteRoles from "@core/guard/requiredRouteRoles";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

const routes: Routes = [
    {
      canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_CLERK_USERS], strategy : 'all'})],
      path: 'usuarios',
        component: ManageUsersTabsComponent
    },
    {
      canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_EDIT_CLERK_USERS], strategy : 'all'})],
      path: 'usuarios/edit/:id',
      component: UsersFormComponent
    },
    {
      canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_CLERK_ROLES], strategy : 'all'})],
      path: 'roles-actor',
      component: ManageRolesComponent
    },
    {
      canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_GROUPS], strategy : 'all'})],
      path: 'grupos',
      component: ManageGroupsComponent
    },
    {
      canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_EDIT_CLERK_ROLES], strategy : 'all'})],
      path: 'roles-actor/edit/:roleId',
      component: ManageRolesComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
