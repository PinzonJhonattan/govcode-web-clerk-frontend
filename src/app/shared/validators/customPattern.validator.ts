import {FormControl, Validators, FormGroup, ValidatorFn, ValidationErrors} from '@angular/forms';

export function customPatternValidator(pattern: RegExp, message: string) : ValidatorFn {
  return (control: FormControl) : ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const isValid = pattern.test(value);
    return isValid ? null : { pattern: { message } };
  };
}
