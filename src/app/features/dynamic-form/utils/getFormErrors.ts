import {FormGroup} from "@angular/forms";

export const getFormValidationErrors = (formGroup: FormGroup) => {
  const errors = [];
  Object.keys(formGroup.controls).forEach(key => {
      const hasError = formGroup.controls[key].status == 'INVALID'
      if (hasError) {
        errors.push(key);
      }
    }
  )
  return errors;
}
