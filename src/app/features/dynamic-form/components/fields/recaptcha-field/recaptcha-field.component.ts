import { Component, OnInit } from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-recaptcha-field',
  templateUrl: './recaptcha-field.component.html',
  styleUrls: ['./recaptcha-field.component.scss']
})
export class RecaptchaFieldComponent extends  DynamicFieldBaseComponentComponent implements OnInit {

  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl
    }
  }
}
