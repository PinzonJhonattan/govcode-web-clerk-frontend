import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTaskFormRoutingModule } from './user-task-form-routing.module';
import { UserTaskFormComponent } from './user-task-form.component';
import {BreadcrumbsModule} from "@vex/components/breadcrumbs/breadcrumbs.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {SecondaryToolbarModule} from "@vex/components/secondary-toolbar/secondary-toolbar.module";
import {DynamicFormModule} from "@features/dynamic-form/dynamic-form.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PageLayoutModule} from "@vex/components/page-layout/page-layout.module";
import {SharedModule} from "@shared/shared.module";
import {CodeInputModalComponent} from "@shared/components/organisms/code-input-modal/code-input-modal.component";


@NgModule({
  declarations: [
    UserTaskFormComponent
  ],
  imports: [
    CommonModule,
    UserTaskFormRoutingModule,
    BreadcrumbsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    SecondaryToolbarModule,
    DynamicFormModule,
    MatProgressSpinnerModule,
    PageLayoutModule,
    SharedModule,
    CodeInputModalComponent,
  ]
})
export class UserTaskFormModule { }
