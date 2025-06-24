import { Component, OnInit } from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-radio-list-field',
  templateUrl: './radio-list-field.component.html',
  styleUrls: ['./radio-list-field.component.scss']
})
export class RadioListFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit {
  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      label : this.component.label,
      description : this.component.description,
      name : this.name,
      readonly : this.component.readonly,
      options : this.component.values,
      numColumns : this.component?.properties?.numColumns,
      sendLabels : true
    }
  }

}
