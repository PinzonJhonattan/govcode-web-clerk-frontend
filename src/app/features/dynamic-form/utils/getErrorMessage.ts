export const getErrorMessage = (form : any, component : any) => {
  const field = form.get(component.key)
  if (field.hasError('required')) {
    return `${component.label} es requerido.`;
  }
  if (field.hasError('minlength')) {
    return `${component.label} debe tener mínimo ${component.validate?.minLength} caracteres.`;
  }
  if (field.hasError('maxlength')) {
    return `${component.label} debe tener máximo ${component.validate?.maxLength} caracteres.`;
  }
  if (field.hasError('min')) {
    return `${component.label} debe ser como mínimo ${component.validate?.min}.`;
  }
  if (field.hasError('max')) {
    return `${component.label} debe ser como máximo ${component.validate?.max}.`;
  }
  if (field.hasError('pattern')) {
    return `${component.label} no cumple con el formato requerido.`;
  }
  return null; // Retornar null si no hay error
}
