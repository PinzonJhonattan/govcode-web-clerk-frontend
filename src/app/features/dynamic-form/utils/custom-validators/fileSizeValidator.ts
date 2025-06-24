import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileSizeValidator(maxSizeString: string) {
  const unitMultiplier: any = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB : 1024 * 1024 * 1024
  };

  const matches = maxSizeString.match(/^(\d+(\.\d+)?)\s*(B|KB|MB|GB)$/i);

  if (matches && matches.length === 4) {
    const maxSizeValue = parseFloat(matches[1]);
    const maxSizeUnit = matches[3].toUpperCase();
    const maxSizeInBytes = maxSizeValue * unitMultiplier[maxSizeUnit];

    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File;

      if (file) {
        const fileSizeInBytes = file?.size;

        if (fileSizeInBytes > maxSizeInBytes) {
          return { fileSizeExceeded: {
              maxSize : maxSizeString
            } };
        }
      }
      return null;
    };
  } else {
    return null
  }
}
