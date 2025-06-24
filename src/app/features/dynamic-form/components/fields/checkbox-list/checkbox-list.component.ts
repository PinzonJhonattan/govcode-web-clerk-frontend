import { Component, OnInit } from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent extends DynamicFieldBaseComponentComponent implements OnInit {

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
      numColumns : this.component.properties?.numColumns,
      sendLabels : true
    }
  }
}
