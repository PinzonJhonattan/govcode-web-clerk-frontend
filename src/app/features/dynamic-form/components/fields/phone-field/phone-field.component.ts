import {Component} from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss']
})
export class PhoneFieldComponent extends DynamicFieldBaseComponentComponent {
  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      type : 'phone',
      label : this.component.label,
      placeholder : this.component.description,
      name : this.name,
      readonly : this.component.readonly,
    }
  }
}
