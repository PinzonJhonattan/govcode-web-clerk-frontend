import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneRegex = /^\+\d{1,4}\s\d+$/;

    if (!phoneRegex.test(control.value)) {
      return { invalidPhone: true };
    }

    return null;
  };
}
