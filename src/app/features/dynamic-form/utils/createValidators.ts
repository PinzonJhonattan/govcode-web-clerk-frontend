import {Validators} from "@angular/forms";
import {fileSizeValidator} from "@features/dynamic-form/utils/custom-validators/fileSizeValidator";
import {fileTypeValidator} from "@features/dynamic-form/utils/custom-validators/fileTypeValidator";
import {phoneValidator} from "@features/dynamic-form/utils/custom-validators/phoneValidator";
import {customPatternValidator} from "@features/dynamic-form/utils/custom-validators/customPatternValidator";

export const createValidators = (validations : any) => {
  let validators : any[]  = []

  if(!validations) return validators;

  if(validations.required){
    validators.push(Validators.required)
  }
  if(validations.minLength){
    validators.push(Validators.minLength(validations.minLength))
  }
  if(validations.maxLength){
    validators.push(Validators.maxLength(validations.maxLength))
  }
  if(validations.min){
    validators.push(Validators.min(validations.min))
  }
  if(validations.max){
    validators.push(Validators.max(validations.max))
  }
  if(validations.pattern){
    validators.push(customPatternValidator(validations.pattern, validations.patternMessage))
  }
  if(validations.validationType === 'email'){
    validators.push(Validators.email)
  }
  if(validations.validationType === 'phone'){
    validators.push(phoneValidator());
  }
  if(validations.allowExtensions){
    validators.push(fileTypeValidator(validations.allowExtensions));
  }
  if(validations.limitSize){
    validators.push(fileSizeValidator(validations.limitSize));
  }
  return validators;
}
