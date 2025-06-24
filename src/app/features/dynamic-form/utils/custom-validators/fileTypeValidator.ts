import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileTypeValidator(allowedExtensionsString: string) {
  const allowedExtensions = allowedExtensionsString.split(',').map(ext => ext.trim().toLowerCase());

  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (file) {
      const fileMimeType = file?.type?.toLowerCase();
      const fileExtension = fileMimeType?.split('/')[1];
      const nameExtensionPoints = file.name?.split('.')
      if(!nameExtensionPoints){
        return null
      }
      const extensionFile = nameExtensionPoints[nameExtensionPoints?.length - 1];
      if (!allowedExtensions.includes(fileExtension) && !allowedExtensions.includes(extensionFile) ) {
        return { invalidExtension: {
           allowedExtensions: allowedExtensionsString,
          } };
      }
    }
    return null;
  };
}
