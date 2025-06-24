import {AbstractControl, FormGroup} from "@angular/forms";

export type DynamicFormGroup = FormGroup<DynamicFormControl>
export interface DynamicFormControl{
  [key : string] : AbstractControl<any, any>
}
export interface TabsStructure {
  [key: string]: ComponentForm[][];
}

export type FormFieldControl = string | null
export interface FormStructure {
  components : ComponentForm[]
  typeForm : string
}
export interface ComponentForm {
  label: string;
  dateLabel: string;
  timeLabel : string;
  key: string;
  id: string;
  validate : any;
  layout : {
    row : string;
    columns : number;
    numColumns : number;
  };
  description: string;
  properties ?: { [key : string] : any } ;
  text?: string;
  values?: any;
  defaultValue : any;
  disabled : boolean;
  readonly  : boolean;
  searchable : boolean;
  appearance ?: { [key : string] : any};
  allowExtensions ?: string[];
  limitSize ?: string;
  conditional ?:any;
  notCountAsInitialElement?:boolean;
}

