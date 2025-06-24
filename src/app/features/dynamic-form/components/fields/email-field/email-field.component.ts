import {Component, OnInit} from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss']
})
export class EmailFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit{

  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      type : 'email',
      label : this.component.label,
      placeholder : this.component.description,
      name : this.name,
      readonly : this.component.readonly,
    }
  }
}
