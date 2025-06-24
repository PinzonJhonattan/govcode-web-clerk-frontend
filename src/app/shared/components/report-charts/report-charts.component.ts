import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnsHeader, Procedure, noFiltersColumnsCharts } from '@features/dynamic-report/models/dynamic-reports.model';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-report-charts',
  templateUrl: './report-charts.component.html',
  styleUrls: ['./report-charts.component.scss']
})
export class ReportChartsComponent implements OnChanges {

  @Input() jsonFormData: any;
  @Input() columnHeaders: ColumnsHeader[];
  @Input() noFiltersColumnsCharts: noFiltersColumnsCharts[];
  @Input() listOfDates: string[];
  @Input() listOfProcedures: Procedure[];

  formChart: FormGroup;

  public datesForChart: string[] = [];
  public compareGraphWithRespectTo: any[] = [];
  public preoviousCompareGraphWithRespectTo: any = {};

  single = [
    {
      "name": "Test value 1",
      "value": 8940000
    },
  ];

  // 800 x 400 original
  view: [number, number] = [1000, 571.43];

  // options bar
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  // options pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#CFD454', '#4BAF4F', '#8CC24A', '#FEEC3B', '#FEC003', '#00BBD4', '#009788', '#3435fd', '#36cde1', '#5659fd', '#3ea9f5']
  };

  chart_type = [
    { value: 'bar', viewValue: 'Columnas' },
    { value: 'pie', viewValue: 'Circular' },
  ];

  constructor(
    private fb: FormBuilder,
  ) {
    Object.assign(this, { single: this.single });

    this.formChart = this.fb.group({
      chartType: ['', Validators.required],
      compareGraphWithRespectTo: ['', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columnHeaders || changes.noFiltersColumnsCharts) {
      this.dataForChart(this.columnHeaders, this.noFiltersColumnsCharts);
    }
    if (changes.listOfProcedures) {
      if (this.preoviousCompareGraphWithRespectTo.name) {
        this.formChart.get('compareGraphWithRespectTo').setValue(this.preoviousCompareGraphWithRespectTo);
        this.changeCompareGraph(this.preoviousCompareGraphWithRespectTo);
      }
    }
  }

  dataForChart(columnHeaders: ColumnsHeader[], noFiltersColumnsCharts: noFiltersColumnsCharts[]) {
    // Filtrar la lista de strings que iran en el label "Comparar con respecto a" de la grafica
    const columnHeadersLabels = new Set(columnHeaders.map((item: any) => {
      return {
        name: item.label,
        property: item.property,
      }
    }));
    const noFiltersColumnsNames = new Set(noFiltersColumnsCharts.map((item: any) => item.name));
    const uniquesInColumnHeaders = [...columnHeadersLabels].filter(header =>
      !noFiltersColumnsNames.has(header.name)
    );
    const uniquesInNoFiltersColumns = [...noFiltersColumnsNames].filter(name =>
      ![...columnHeadersLabels].some(header => header.name === name)
    ).map(name => ({ name: name, property: null }));
    const uniques = [...uniquesInColumnHeaders, ...uniquesInNoFiltersColumns];
    this.compareGraphWithRespectTo = uniques;

    const fechasUnicas = [...new Set(this.listOfDates)];
    this.datesForChart = fechasUnicas;
  }

  changeCompareGraph(event) {
    this.xAxisLabel = event.name;
    const selectedProperty = event.property;
    console.log('selectedProperty', selectedProperty);

    const countMap = new Map();
    this.listOfProcedures.forEach(procedure => {
      if (procedure) {
        let value = procedure[selectedProperty];
        if (value && value !== undefined) {
          if(typeof value === 'number') {
            value = value.toString();
          }
          console.log('value', value);
          countMap.set(value, (countMap.get(value) || 0) + 1);
        }
      }
    });

    const newSingle = Array.from(countMap, ([name, value]) => ({ name, value }));

    this.single = newSingle;
    this.preoviousCompareGraphWithRespectTo = event;
  }

  compareFn(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.property === o2.property : o1 === o2;
  }

}
