import { Component, OnInit, ViewChild } from '@angular/core';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { TipoReporte } from 'src/app/shared/models/TipoReporte';
import { TipoReporteFiltro } from 'src/app/shared/models/TipoReporteFiltro';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from "@angular/common/http";
import { JsonDynamicReport, dashboardFilters } from '@features/dynamic-report/models/dynamic-reports.model';
import { ReportTypesService } from '@core/services/report-types.service';
import { ReportTypes } from '@core/models/report-types.model';
import { tap } from 'rxjs';

@Component({
  selector: 'jasper-reports',
  templateUrl: './jasper-reports.component.html',
  styleUrls: ['./jasper-reports.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class JasperReportsComponent implements OnInit {
  layoutCtrl = new UntypedFormControl("fullwidth");

  viewDynamicReport: boolean = false;
  loading: boolean = false;
  urlReport: string = '';
  tipo_reporte_filtros: ReportTypes[] = []

  public formData: JsonDynamicReport;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private reportTypesService: ReportTypesService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.reportTypesService.get()
      .pipe(
        tap(() => {this.loading = false})
      )
      .subscribe({
        next: (tipoReportes: ReportTypes[]) =>{
          this.tipo_reporte_filtros = tipoReportes;
          console.log(this.tipo_reporte_filtros);
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        }
      })
  }


  onChangeTipoReporteFiltro(e: ReportTypes) {
    this.formData = e.Filter

    this.urlReport = e.Url;
    this.viewDynamicReport = true;
  }

}
