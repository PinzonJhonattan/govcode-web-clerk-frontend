import {Component} from '@angular/core';

import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";
import {FormArray, FormControl} from "@angular/forms";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})

export class TextFieldComponent  extends  DynamicFieldBaseComponentComponent  {

  dynamicProps : any;

  constructor() {
    super();
  }
  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      type : 'text',
      label : this.component.label,
      placeholder : this.component.description,
      name : this.name,
      readonly : this.component.readonly,
      suffix: this.component.properties?.suffix,
      prefix: this.component.properties?.prefix,
      thousandSeparator: this.component.properties?.thousandSeparator,
      mask: this.component.properties?.mask,
      keepMask: this.component.properties?.keepMask,
      decimalDigits: this.component.properties?.decimalDigits,
      decimalMarker: this.component.properties?.decimalMarker,
      pattern : this.component?.validate?.pattern
    }
  }
}
