import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureDataRoutingModule } from './procedure-data-routing.module';
import { BreadcrumbsModule } from '@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '@vex/components/page-layout/page-layout.module';
import {FilesProcedureComponent} from "@features/procedure-data/files-procedure/files-procedure.component";
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "@shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@NgModule({
  declarations: [
    FilesProcedureComponent
  ],
  imports: [
    CommonModule,
    ProcedureDataRoutingModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatTabsModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ]
})
export class ProcedureDataModule { }
