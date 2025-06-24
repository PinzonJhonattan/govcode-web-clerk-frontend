import {Component, OnInit} from '@angular/core';
import { DynamicFieldBaseComponentComponent } from '../../base/dynamic-field-base-component/dynamic-field-base-component.component';

@Component({
  selector: 'app-file-view-field',
  templateUrl: './file-view-field.component.html',
  styleUrls: ['./file-view-field.component.scss']
})
export class FileViewFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit{

  dynamicProps : any;
  refDocument : string = '';
  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();

    if(this.component?.properties?.groupSection){
      this.refDocument = this.component?.properties?.groupSection?.value[this.component?.key]?.refDocument
    }
    this.dynamicProps = {
      fieldControl : this.form.controls[this.component.key],
      label : this.component.label,
      name : this.refDocument ? this.refDocument  : this.name
    }
  }
}
