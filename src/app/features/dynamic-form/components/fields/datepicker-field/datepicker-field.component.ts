import { Component } from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-datepicker-field',
  templateUrl: './datepicker-field.component.html',
  styleUrls: ['./datepicker-field.component.scss']
})
export class DatepickerFieldComponent extends DynamicFieldBaseComponentComponent{

  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      label : this.component.dateLabel || this.component.label,
      placeholder : this.component.description,
      name : this.name,
      readonly : this.component.readonly,
    }
  }

}
