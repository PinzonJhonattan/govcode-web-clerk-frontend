import {ComponentForm} from "@features/dynamic-form/models/formStructure.model";

export const getValueByFieldType = (component: ComponentForm, values : any) => {
  switch (component.properties?.type) {
    case "uploadFile":
      return values[component.key]?? null;
    case "select":
    case "radioList":
      return values[component.key]?.value ?? (component?.defaultValue === "<none>" || !component?.defaultValue ?  null : component.defaultValue) ?? null;
    case "checkbox":
      const valueCheckboxProcess = values[component.key]?.value
      return valueCheckboxProcess === true || (valueCheckboxProcess === false && !component?.defaultValue)  ? valueCheckboxProcess :  component?.defaultValue || false
    default :
       return values[component.key]?.value ?? component?.defaultValue ?? null;
  }
}
