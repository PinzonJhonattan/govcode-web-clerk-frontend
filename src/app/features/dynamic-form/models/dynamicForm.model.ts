import {FormGroup} from "@angular/forms";

export interface DynamicForm {
  fieldsForm : any[]
  form : FormGroup
  valuesForm : any
  uiForm : any
}

export interface CompleteFormProps {
  form ?: FormGroup;
  variables ?: any;
}
