import {FormGroup} from "@angular/forms";

export const combineFormValues = (forms : FormGroup[] = []) => {
  return forms.reduce((accumValues, form) => {
    return { ...accumValues, ...form.value };
  }, {});
}
