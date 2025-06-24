import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ComponentForm, DynamicFormGroup} from "@features/dynamic-form/models/formStructure.model";
import {createFieldControl} from "@features/dynamic-form/utils/createFieldControl";
import {FormControl} from "@angular/forms";
import {generateRandomString} from "../../../utils/generateRandomString";

@Component({
  selector: 'app-dynamic-field-base-component',
  templateUrl: './dynamic-field-base-component.component.html',
  styleUrls: ['./dynamic-field-base-component.component.scss']
})

export class DynamicFieldBaseComponentComponent implements OnInit {
  @Input() form!: DynamicFormGroup;
  @Input() valuesForm: any;
  @Input() component!: ComponentForm;
  @Input() uiForm : any;

  componentToRender : any = null;
  fieldControl : FormControl;
  name: string;

  constructor() {
  }

  ngOnInit(): void {
    createFieldControl(this.form, this.component, this.valuesForm);
    this.componentToRender = this.uiForm?.uiComponents[this.component?.properties?.type || 'text']?.renderComponent
    this.fieldControl = this.form.controls[this.component.key] || this.component?.properties?.groupSection?.get(this.component.key);
    this.name = this.component?.properties?.groupSection && this.component.properties.type == 'uploadFile' ? `${this.component?.key}_${generateRandomString()}` : this.component?.key

  }
  
  ngOnDestroy() {
    if (!this.component?.properties?.groupSection) {
      this.form.removeControl(this.component?.key || this.component?.properties?.key)
    }else {
      this.component?.properties?.groupSection?.removeControl(this.component?.key || this.component?.properties?.key)
    }
  }
}
