import {FormControl} from "@angular/forms";

export const getErrorMessage = (field : FormControl) => {
  const fieldErrors = field.errors as any;
  if (field.hasError('required')) {
    return `Este campo es requerido.`;
  }
  else if (field.hasError('minlength')) {
    return `El campo debe tener mínimo ${fieldErrors.minlength.requiredLength} caracteres.`;
  }
  else if (field.hasError('maxlength')) {
    return `El campo debe tener máximo ${fieldErrors?.maxlength.requiredLength} caracteres.`;
  }
  else if (field.hasError('min')) {
    return `El campo debe ser como mínimo ${fieldErrors?.min.min}.`;
  }
  else if (field.hasError('max')) {
    return `El campo debe ser como máximo ${fieldErrors?.max.max}.`;
  }
  else if (field.hasError('pattern')) {
    return `${fieldErrors.pattern.message || 'El campo no cumple con el formato requerido'}`;
  }
  else if (field.hasError('fileSizeExceeded')) {
    return `El archivo supera el limite maximo ( ${fieldErrors.fileSizeExceeded.maxSize} ).`;
  }
  else if (field.hasError('invalidExtension')) {
    return `El tipo del archivo no es permitido`;
  }
  else if (field.hasError('email')) {
    return `El correo proporcionado no es valido`;
  }
  else if (field.hasError('invalidPhone')) {
    return `El télefono proporcionado no es valido`;
  }
  return null; // Retornar null si no hay error
}
