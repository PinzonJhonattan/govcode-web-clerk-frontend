export interface JsonDynamicReport {
  dashboardFilters: dashboardFilters[];
  noFiltersColumnsCharts: noFiltersColumnsCharts[];
}

export interface dashboardFilters {
  name: string;
  type: string;
  key: string;
  validate: Validators;
  values: Values[];
  defaultValue: string;
  urlDynamic?: string;
}

export interface noFiltersColumnsCharts {
  name: string;
}

interface Validators {
  required: boolean;
  minLength: number;
}

interface Values {
  label: string;
  value: string;
}

export interface ReportTable {
  title: string;
  dateGenerated: string;
  period: string;
  titlePage: string;
  columnsHeaders: ColumnsHeader[];
  procedures: Procedure[];
  totalProcedures: TotalProcedure[];
  color: Color[];
}

export interface ColumnsHeader {
  radicateBia: string;
  dateRadicate: string;
  proceeding: string;
  typeProcedure: string;
  city: string;
  resultProcedure: string;
  typeResquest: string;
  name: string;
}

export interface Procedure {
  radicateBia: string;
  dateRadicate: string;
  proceeding: string;
  name: string;
  typeRequest: string;
  typeProcedure: string;
  city: string;
  resultProcedure: string;
}

export interface TotalProcedure {
  label: string;
  value: number;
}

export interface Color {
  resultProcedure: resultProcedure[];
}

export interface resultProcedure {
  otorgados: string;
  negados: string;
  solicitado: string;
}