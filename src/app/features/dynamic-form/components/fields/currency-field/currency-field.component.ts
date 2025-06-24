import { Component, OnInit } from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-currency-field',
  templateUrl: './currency-field.component.html',
  styleUrls: ['./currency-field.component.scss']
})
export class CurrencyFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit {

  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      type : 'currency',
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
