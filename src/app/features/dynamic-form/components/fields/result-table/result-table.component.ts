import {Component, OnInit} from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent extends DynamicFieldBaseComponentComponent implements OnInit {

  dynamicProps: any;
  actualValue : number = 0;
  constructor() {
    super()
  }

  override ngOnInit(): void {
    super.ngOnInit()

    this.dynamicProps = {
      fieldControl : this.fieldControl,
      label: this.component.label,
      type: 'text',
      placeholder: this.component.description,
      name : this.name,
      readonly: true
    }

    this.form.valueChanges.subscribe(data => {
      const result = Object.entries(data)
        .filter(([clave, valor]) => clave.includes(`${this.component.properties?.lastColumnResult}_${this.component.properties?.tableIdentity}_`))
        .reduce((total, [_, valor]) => total + Number(valor), 0)
       if(result && result != this.actualValue){
         this.actualValue = result
         this.form.get(this.component.key).setValue(result);
       }
    })
  }
}
