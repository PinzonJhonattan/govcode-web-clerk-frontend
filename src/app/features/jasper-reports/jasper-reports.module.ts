import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JasperReportsRoutingModule } from './jasper-reports-routing.module';
import { JasperReportsComponent } from './jasper-reports.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ReporteTodosLosTramitesComponent } from './reportes-tramites/reportes-todos-los-tramites/reportes-todos-los-tramites.component';
import { ReporteTramitesPorEstadoComponent } from './reportes-tramites/reportes-tramites-por-estado/reportes-tramites-por-estado.component';
import { SharedModule } from '@shared/shared.module';
import { PageLayoutModule } from '@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from '@vex/components/breadcrumbs/breadcrumbs.module';
import { MatCardModule } from '@angular/material/card';
import { ReportesTramitesOtorgadosNegadosComponent } from './reportes-tramites/reportes-tramites-otorgados-negados/reportes-tramites-otorgados-negados.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DynamicReportComponent } from '@features/dynamic-report/dynamic-report.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    JasperReportsRoutingModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    //Reportes
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    DynamicReportComponent
  ],
  declarations: [
    JasperReportsComponent,
    ReporteTodosLosTramitesComponent,
    ReporteTramitesPorEstadoComponent,
    ReportesTramitesOtorgadosNegadosComponent,
  ],
})
export class JasperReportsModule {
}

