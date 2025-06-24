import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey)?.value as string;
    const confirmPassword = control.get(confirmPasswordKey)?.value as string;

    if (password !== confirmPassword) {
      control.get(confirmPasswordKey)?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }

    return null;
  };
}
