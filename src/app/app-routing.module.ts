import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomLayoutComponent } from "@shared/layouts/custom-layout/custom-layout.component";
import { VexRoutes } from "@vex/interfaces/vex-route.interface";
import { QuicklinkModule, QuicklinkStrategy } from "ngx-quicklink";
import requiredRouteRoles from "@core/guard/requiredRouteRoles";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";
import {AuthGuard} from "@core/guard/auth.guard";
import { MenuEditorComponent } from "@vex/components/menu-editor/menu-editor.component";

const routes: VexRoutes = [
  {
    path: "login",
    loadChildren: () =>
      import("@features/auth/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("@features/auth/register/register.module").then(
        m => m.RegisterModule
      )
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("@features/auth/forgot-password/forgot-password.module").then(
        m => m.ForgotPasswordModule
      )
  },
  {
    path: "",
    component: CustomLayoutComponent,
    canActivate : [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "@features/home/home.module"
            ).then(m => m.HomeModule)
      },
      {
        path: "tareas-pendientes",
        canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_TASKS], strategy : 'all'})],
        loadChildren: () =>
          import(
            "@features/list-pending-procedures/list-procedures.module"
            ).then(m => m.ListProceduresModule)
      },
      {
        path: "gestion-usuarios-funcionarios",
        canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_CLERK_USERS], strategy : 'all'})],
        loadChildren: () =>
          import("@features/manage-users/manage-users.module")
          .then(  m => m.ManageUsersModule)
      },
      {
        path: "gestion-usuarios-ciudadanos",
        canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_CITIZEN_USERS], strategy : 'all'})],
        loadChildren: () =>
          import("@features/manage-citizens/manage-citizens.module").then(
            m => m.ManageCitizensModule
          )
      },
      {
        path: "asignar-tareas",
        canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_REASSIGN_TASKS], strategy : 'all'})],
        loadChildren: () =>
          import("@features/users-tasks/users-tasks.module").then(
            m => m.UsersTasksModule
          )
      },
      {
        path: "datos-proceso",
        canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_HISTORY_DOCUMENTS], strategy : 'all'})],
        loadChildren: () =>
          import("@features/procedure-data/procedure-data.module").then(
            m => m.ProcedureDataModule
          )
      },
      {
        path: "reportes",
        canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_REPORTS], strategy : 'all'})],
        loadChildren: () =>
          import("@features/jasper-reports/jasper-reports.module").then(
            m => m.JasperReportsModule
          )
      },
      {
        path: "form",
        loadChildren: () =>
          import("@features/user-task-form/user-task-form.module").then(
            m => m.UserTaskFormModule
          )
      },
      {
        path: "formularios",
        loadChildren: () =>
          import("@features/form-viewer/form-viewer.module").then(
            m => m.FormViewerModule
          )
      },
      {
        path: "respuestas",
        loadChildren: () =>
          import("@features/form-response/form-response.module").then(
            m => m.FormResponsesModule
          )
      },
      {
        path: "dashboards/analytics",
        redirectTo: "/",
        pathMatch: "full"
      },
      {
        path: "admin",
        loadChildren: () =>
          import("@features/admin-basic-data/admin-basic-data.module").then(
            m => m.AdminBasicDataModule
          )
      },
/*      {
        path: "manage-licenses",
        loadChildren: () =>
          import("@features/manage-licenses/manage-licenses.module").then(m => m.ManageLicensesModule)
      },*/
      {
        path: "recurso-no-permitido",
        loadChildren: () =>
          import("./pages/pages/errors/error-403/error-403.module").then(
              m => m.Error403Module
          )
      },
    ]
  },
  {
    path: 'admin/menu-editor',
    component: MenuEditorComponent
  },
  {
    path: "**",
    loadChildren: () =>
      import("./pages/pages/errors/error-404/error-404.module").then(
        m => m.Error404Module
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled"
    })
  ],
  exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule { }
