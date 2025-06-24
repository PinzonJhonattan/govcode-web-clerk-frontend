import {JsonDynamicReport} from "@features/dynamic-report/models/dynamic-reports.model";

export interface ReportTypes {
  Id: number;
  Name: string;
  Url: string;
  Filter: JsonDynamicReport;
}

export type ReportTypeDTO = Omit<ReportTypes, 'Id'>;
