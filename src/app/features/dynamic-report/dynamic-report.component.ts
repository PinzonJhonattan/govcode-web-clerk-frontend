import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Color, ColumnsHeader, JsonDynamicReport, Procedure, ReportTable, dashboardFilters, noFiltersColumnsCharts, resultProcedure } from './models/dynamic-reports.model';
import {FormBuilder, FormGroup, Validators, UntypedFormControl, ReactiveFormsModule} from '@angular/forms';
import { ReportService } from '@core/services/report.service';
import { ReportDTO } from '@core/models/report.model';
import { columnTramitesOtorgadosNegados } from './constants/columns-tramites-otorgados-negados';
import { tap } from 'rxjs';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats, MatNativeDateModule, MatOptionModule,
  NativeDateAdapter
} from "@angular/material/core";
import {SharedModule} from "@shared/shared.module";
import {PageLayoutModule} from "@vex/components/page-layout/page-layout.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {CommonModule, formatDate} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import moment from 'moment';
import {map} from "rxjs/operators";

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',  // Formato de entrada
  },
  display: {
    dateInput: 'DD/MM/YYYY',  // Formato de visualización
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-dynamic-report',
  templateUrl: './dynamic-report.component.html',
  styleUrls: ['./dynamic-report.component.scss'],
  imports: [CommonModule, MatNativeDateModule, SharedModule, PageLayoutModule, MatDatepickerModule, MatFormFieldModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule, MatInputModule],
  standalone: true,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Localización en español
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicReportComponent implements OnChanges {
  @Input() jsonFormData: JsonDynamicReport;
  @Input() urlReport: string;
  layoutCtrl = new UntypedFormControl("fullwidth");
  noFiltersColumnsCharts: noFiltersColumnsCharts[] = [];

  public myForm: FormGroup = this.fb.group({});
  public reportDTO: ReportDTO = {
    urlReport: '',
    parameters: '',
    extension: ''
  };
  public paramsToConvert: any;
  public loading: boolean = false;
  public showDynamicTable: boolean = false;
  public state: string = 'idle';
  public reportData: ReportTable;
  public columnsReport: any[] = [];
  public parametrosSinModificar: any;
  public listOfProcedures: Procedure[] = [];
  public totalOfProcedures: number;
  public colores: Color;

  public columnHeaders: ColumnsHeader[];
  public listOfDates: string[] = [];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.jsonFormData.firstChange) {
      Object.keys(this.myForm.controls).forEach(controlName => {
        this.myForm.removeControl(controlName);
      });
      this.createForm(this.jsonFormData.dashboardFilters);
      this.reportDTO.urlReport = changes.urlReport.currentValue;
      this.noFiltersColumnsCharts = this.jsonFormData.noFiltersColumnsCharts;
    }
  }

  createForm(controls: dashboardFilters[]) {
    for (const control of controls) {
      const validatorsToAdd = [];

      if (control.validate) {
        for (const [key, value] of Object.entries(control.validate)) {
          switch (key) {
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            case 'minlength':
              validatorsToAdd.push(Validators.minLength(value));
              break;
            case 'maxlength':
              validatorsToAdd.push(Validators.maxLength(value));
              break;
            default:
              break;
          }
        }
      }
      // Manejar controles de tipo 'select'
    if (control.type === 'select') {
      if(control.urlDynamic) {
        this.reportService.getDynamicReport(control.urlDynamic).subscribe((response: any) => {
          // Agregar opción "Todos" si el campo no es obligatorio
          if (!validatorsToAdd.includes(Validators.required)) {
            response.unshift({ label: 'Todos', value: '' });
          }
          control.values = response;
        });
      } else {
        // Crear opciones para select no dinámicos
        // Si el control select no es obligatorio, agregar opción "Todos"
        if (!validatorsToAdd.includes(Validators.required)) {
          control.values = [{ label: 'Todos', value: '' }, ...control.values];
        }
      }
    }
      // if(control.urlDynamic) {
      //   this.reportService.getDynamicReport(control.urlDynamic).subscribe((response: any) => {
      //     control.values = response;
      //   });
      // }
      this.myForm.addControl(
        control.key,
        this.fb.control(control.defaultValue, validatorsToAdd)
      );
    }
  }


  getParams(params: any) {
    let paramsString = Object.keys(params)
      .map((key: any) => {
        if (params[key] != null) {
          if (moment.isMoment(params[key])) {
            return `${key}=${params[key].format('YYYY-MM-DD')}`;
          }
          if (typeof params[key] === 'string') {
            return `${key}=${encodeURIComponent(params[key])}`;
          } else {
            return this.arrayToQueryString(params, key);
          }
        }
      }).filter(param => param);
    return paramsString.join('&');

  }

  arrayToQueryString(params, key: string) {
    return (params?.[key] as any[] || [])
      .map((p) => {
        return `${key}=${p}`;
      })
      .join('&');
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    let parametros = this.getParams(this.myForm.value);
    this.parametrosSinModificar = this.myForm.value;
    this.reportDTO.parameters = parametros;
    this.reportDTO.extension = 'json';
    this.loading = true;
    this.state = 'loading';
    this.reportService.post(this.reportDTO)
      .pipe(
        tap(() => {
          this.loading = false;
          this.showDynamicTable = true;
          this.state = 'success';
        })
      )
      .subscribe({
        next: (response) => {
          this.listOfProcedures = response.flatMap((item: ReportTable) => {
            if (item.procedures) {
              item.procedures.forEach(procedure => {
                if (procedure.resultProcedure) {
                  procedure.resultProcedure = procedure.resultProcedure.toLowerCase();
                }
              });
              item.procedures.map((procedure: Procedure) => procedure.dateRadicate !== undefined ? this.listOfDates.push(procedure.dateRadicate) : null);
            }
            if (item.color) {
              this.colores = item.color[0];
            }
            return item.procedures;
          });

          this.reportData = response[0];
          this.totalOfProcedures = response[response.length - 1].totalProcedures;

          this.columnsReport = this.transformColumns(response[0].columnsHeaders);
          this.columnHeaders = this.columnsReport;

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log('Error al generar reporte: ', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
  }

  transformColumns(columnsHeaders: ColumnsHeader[]) {
    const headers = columnsHeaders[0];
    const result = Object.keys(headers).map(key => {
      return {
        label: headers[key],
        property: key.replace(/ /g, ''),
        type: 'text',
        visible: true
      };
    });
    return result;
  }

}
