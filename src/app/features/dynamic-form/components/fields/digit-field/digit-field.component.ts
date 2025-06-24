import { Component, OnInit } from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-digit-field',
  templateUrl: './digit-field.component.html',
  styleUrls: ['./digit-field.component.scss']
})
export class DigitFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit {

  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      type : 'digit',
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
      decimalMarker: this.component.properties?.decimalMarker
    }
  }

}
