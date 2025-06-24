import { Component, OnInit } from '@angular/core';
import {
  DynamicElementBaseComponent
} from "@features/dynamic-form/components/base/dynamic-element-base/dynamic-element-base.component";

@Component({
  selector: 'app-document-template-view',
  templateUrl: './document-template-view.component.html',
  styleUrls: ['./document-template-view.component.scss']
})
export class DocumentTemplateViewComponent extends DynamicElementBaseComponent implements OnInit {

  dynamicProps : any
  constructor() {
    super()
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.form.controls[this.component.key],
      label : this.component.label,
      name : this.name,
      templateName : this.component.properties?.templateName
    }
  }
}
