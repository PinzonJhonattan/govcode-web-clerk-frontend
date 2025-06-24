import {Component} from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss']
})
export class EditorFieldComponent extends DynamicFieldBaseComponentComponent {
  dynamicProps: any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();

    if(this.component?.properties?.downloadTemplate){
      this.dynamicProps = {
        fieldControl: this.fieldControl,
        downloadTemplate : this.component?.properties?.downloadTemplate,
        name: this.name
      }
    }else{
      this.dynamicProps = {
        fieldControl: this.fieldControl,
        value: this.component?.properties?.groupSection ? this.component?.properties?.groupSection?.value[this.component?.key] : this.form.value[this.component?.key],
        name: this.name
      }
    }
  }
}
