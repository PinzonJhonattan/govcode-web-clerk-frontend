import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";
import {replaceVariablesKeys} from "@features/dynamic-form/utils/replaceVariablesKeys";
import {getValuesVariablesCamunda} from "@features/dynamic-form/utils/getValuesVariablesCamunda";
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {combineFormValues} from "@features/dynamic-form/utils/transformFormVariables";
import {GeneralInfoService} from "@features/dynamic-form/services/general-info.service";

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit, OnDestroy {
  dynamicProps: any;
  fieldNameValue: string;

  constructor(private http: HttpClient, private generalInfo : GeneralInfoService) {
    super()
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.dynamicProps = {
      fieldControl: this.fieldControl,
      label: this.component.label,
      placeholder: this.component.description,
      name : this.name,
      readonly: this.component.readonly,
      options: this.component.values,
      isSearchable: this.component.searchable || false,
      sendLabels: true
    }

    this.getValuesSelect();

    const groupSection = this.component?.properties?.groupSection || this.form;
    this.fieldNameValue = `${this.component?.key}_value`;
    groupSection.addControl(this.fieldNameValue, new FormControl(''));

    this.fieldControl.valueChanges.subscribe(data => {
      const optionChoosed = this.dynamicProps.options.find(option => option.label == data || option.value == data)
      groupSection.get(this.fieldNameValue).setValue(optionChoosed?.value)
    })
  }
  getValuesSelect() {
    let urlDynamic = this.component?.properties?.urlDynamic;

    if (urlDynamic) {
      this.getDynamicValues(urlDynamic)

      this.component?.properties?.relatedTo?.split(",").forEach((related: string) => {
        if(this.component.properties?.groupSection?.controls[related]){
          this.component?.properties?.groupSection.get(related)?.valueChanges.subscribe((newValue) => {
            if (typeof newValue !== 'object') {
              this.getDynamicValues(urlDynamic, {[related]: newValue})
            }
          });
        }else{
          this.form.get(related)?.valueChanges.subscribe((newValue) => {
            if (typeof newValue !== 'object') {
              this.getDynamicValues(urlDynamic, {[related]: newValue})
            }
          });
        }

      })
    } else {
      this.dynamicProps.options = this.component.values || []
    }
  }

  getDynamicValues(urlRequest: string, updatedValues?: any) {

    const realUrlRequest = this.component?.properties?.typeUrl === 'internal' ? `${this.generalInfo?.infoForm?.originServer}${urlRequest}` : urlRequest


    const variablesValuesCamunda = getValuesVariablesCamunda(this.valuesForm);

    const externalScope = combineFormValues(this.component?.properties?.externalScope)

    const contextValues = this.component?.properties?.contextValues;

    const urlRequestWithValues = replaceVariablesKeys(realUrlRequest, {...variablesValuesCamunda, ...contextValues, ...this.form.value, ...externalScope, ...updatedValues});

    if (urlRequestWithValues.includes("null") || urlRequestWithValues.includes("undefined")) return;

    this.http.get(urlRequestWithValues).subscribe({
      next: (data) => {
        this.dynamicProps.options = (data as any[]).map((option: any) => ({
          label: option.label,
          value: option.value
        })) || []
      },
      error: () => {
        this.dynamicProps.options = [];
      }
    })
  }

  override ngOnDestroy() {
    super.ngOnDestroy()
    if (!this.fieldNameValue) return;
    const groupSection = this.component?.properties?.groupSection || this.form;
    groupSection?.removeControl(this.fieldNameValue);
  }
}
