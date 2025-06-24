import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-file-upload-field',
  templateUrl: './file-upload-field.component.html',
  styleUrls: ['./file-upload-field.component.scss']
})
export class FileUploadFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit,OnDestroy {
  dynamicProps: any;
  referenceDocument
  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();

    const namesParentsSections  = this.component?.properties?.parentsSection?.join(',')?.replace(/,/g, "_")
    this.referenceDocument = `${this.component?.key}_${namesParentsSections}_${Date.now()}`

    this.dynamicProps = {
      fieldControl: this.fieldControl,
      label: this.component.label,
      name: this.component?.properties?.groupSection ? this.referenceDocument : this.name,
      readonly: this.component.readonly,
      description : this.component?.description,
      allowedTypes : this.component?.properties?.allowExtensions
    }

    if (this.component?.properties?.groupSection) {
      this.form.addControl(this.referenceDocument, new FormControl(''));

      this.fieldControl.valueChanges.subscribe(data => {
        if(!data){
          this.form.get(this.referenceDocument).setValue(null)
        }else{
          this.form.get(this.referenceDocument).setValue({...data, typeComponent : 'uploadFile'})
        }
      })
    }
  }
  override ngOnDestroy() {
    super.ngOnDestroy()
    if (!this.referenceDocument) return;
    this.form?.removeControl(this.referenceDocument);
  }
}
