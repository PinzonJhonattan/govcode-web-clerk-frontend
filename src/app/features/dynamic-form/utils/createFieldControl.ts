import {FormControl} from "@angular/forms";
import {ComponentForm, DynamicFormGroup, FormFieldControl} from "@features/dynamic-form/models/formStructure.model";
import {getValueByFieldType} from "@features/dynamic-form/utils/getValueByFieldType";
import {createValidators} from "@features/dynamic-form/utils/createValidators";

export const createFieldControl = (form: DynamicFormGroup, component: ComponentForm, values: any) => {
  const groupSection = component?.properties?.groupSection;

  if(component.properties?.type === "viewerFile"){
    component.validate = {};
  }

  if (groupSection) {
    groupSection.addControl(
      component.key || component.properties?.key,
      new FormControl<FormFieldControl>({
        value: getValueByFieldType(component, {...values, ...groupSection?.value}),
        disabled: component.disabled
      }, component.readonly ? [] : createValidators({...component.validate, ...component.properties}))
    );
  } else {
    form.addControl(
      component.key || component.properties?.key,
      new FormControl<FormFieldControl>({
        value: getValueByFieldType(component, values),
        disabled: component.disabled
      }, component.readonly ? [] : createValidators({...component.validate, ...component.properties}))
    );
  }

}
