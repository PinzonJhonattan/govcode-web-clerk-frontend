import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersTasksRoutingModule } from './users-tasks-routing.module';
import {BreadcrumbsModule} from "@vex/components/breadcrumbs/breadcrumbs.module";
import {ComplexTableModule} from "@shared/components/complex-table/complex-table.module";
import {PageLayoutModule} from "@vex/components/page-layout/page-layout.module";
import {MatDialogModule} from '@angular/material/dialog';
import { AssignTaskFormComponent } from '@features/users-tasks/users-task-form/assign-task-form.component';
import {UsersTasksComponent} from "@features/users-tasks/users-tasks.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ComponentsModule } from '@shared/components/components.module';


@NgModule({
  declarations: [
    UsersTasksComponent,
    AssignTaskFormComponent
  ],
    imports: [
        CommonModule,
        UsersTasksRoutingModule,
        PageLayoutModule,
        BreadcrumbsModule,
        ComplexTableModule,
        MatDialogModule,
        FormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        ComponentsModule
    ]
})
export class UsersTasksModule { }
