import { Component } from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-datetimepicker-field',
  templateUrl: './datetimepicker-field.component.html',
  styleUrls: ['./datetimepicker-field.component.scss']
})
export class DatetimepickerFieldComponent extends DynamicFieldBaseComponentComponent{

  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      label : this.component.timeLabel || this.component.label,
      placeholder : this.component.description,
      name : this.name,
      readonly : this.component.readonly,
    }
  }


}
