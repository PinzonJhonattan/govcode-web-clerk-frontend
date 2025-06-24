import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customPatternValidator(pattern: RegExp, message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = new RegExp(pattern).test(control.value);
    if (!isValid) {
      return { pattern: {
          actualValue : control.value,
          requiredPattern : pattern,
          message : message || `El campo no cumple con el formato requerido (${pattern})`
        } };
    }
    return null;
  };
}
