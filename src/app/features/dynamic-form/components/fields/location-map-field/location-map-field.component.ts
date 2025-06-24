import { Component, OnInit } from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-location-map-field',
  templateUrl: './location-map-field.component.html',
  styleUrls: ['./location-map-field.component.scss']
})
export class LocationMapFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit {
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
      form : this.form,
      groupSection : this.component?.properties?.groupSection || this.form,
    }
  }

}
