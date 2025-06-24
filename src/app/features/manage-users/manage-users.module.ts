import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutModule } from '@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from '@vex/components/breadcrumbs/breadcrumbs.module';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ComplexTableModule } from '@shared/components/complex-table/complex-table.module';
import { ManageUsersTabsComponent } from './manage-users-tabs/manage-users-tabs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ListOfUsersComponent } from './manage-users-tabs/list-of-users/list-of-users.component';
import { UsersFormComponent } from './manage-users-tabs/users-form/users-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
import { MatSelectModule } from '@angular/material/select';
import {ManageRolesComponent} from "@features/manage-users/manage-roles/manage-roles.component";
import {ListOfRolesComponent} from "@features/manage-users/manage-roles/list-of-roles/list-of-roles.component";
import {SharedModule} from "@shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import { ViewUserRolesComponent } from './manage-users-tabs/view-user-roles/view-user-roles.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [ManageUsersTabsComponent, ManageRolesComponent, ListOfRolesComponent, ListOfUsersComponent, UsersFormComponent, ResetPasswordModalComponent, ViewUserRolesComponent],
    imports: [
        BreadcrumbsModule,
        CommonModule,
        ComplexTableModule,
        ManageUsersRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        PageLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
    ],
  exports: [
    ListOfRolesComponent
  ]
})
export class ManageUsersModule {}
