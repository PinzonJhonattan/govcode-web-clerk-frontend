// A provider abstract class appears to be neccessary for
// data injection, but it doesn't need further definition.
import {ComponentForm, DynamicFormGroup} from "@features/dynamic-form/models/formStructure.model";

export abstract class ProviderClassFieldFormComponent {
  public form : DynamicFormGroup
  public component : ComponentForm
  public valuesForm : any
}

