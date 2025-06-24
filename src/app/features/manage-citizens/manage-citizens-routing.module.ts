import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCitizensTabsComponent } from './manage-citizens-tabs/manage-citizens-tabs.component';
import { CitizensFormComponent } from './manage-citizens-tabs/citizens-form/citizens-form.component';
import {ManageRolesComponent} from "@features/manage-citizens/manage-roles/manage-roles.component";
import requiredRouteRoles from "@core/guard/requiredRouteRoles";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

const routes: Routes = [
    {
      canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_CITIZEN_USERS], strategy : 'all'})],
      path: 'usuarios',
        component: ManageCitizensTabsComponent
    },
    {
      canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_EDIT_CITIZEN_USERS], strategy : 'all'})],
      path: 'usuarios/edit/:id',
        component: CitizensFormComponent
    },
    {
      canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_CITIZEN_ROLES], strategy : 'all'})],
      path: 'roles-actor',
      component: ManageRolesComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageCitizensRoutingModule { }
