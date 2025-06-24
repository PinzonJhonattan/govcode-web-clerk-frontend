import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListProceduresRoutingModule } from "./list-procedures-routing.module";
import { ListProceduresComponent } from "./list-procedures.component";
import { PageLayoutModule } from "@vex/components/page-layout/page-layout.module";
import { BreadcrumbsModule } from "@vex/components/breadcrumbs/breadcrumbs.module";
import { ComplexTableModule } from "@shared/components/complex-table/complex-table.module";
import { ModalDetailsComponent } from './modal-details/modal-details.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [ListProceduresComponent, ModalDetailsComponent],
  imports: [
    CommonModule,
    ListProceduresRoutingModule,
    PageLayoutModule,
    BreadcrumbsModule,
    ComplexTableModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class ListProceduresModule {}
