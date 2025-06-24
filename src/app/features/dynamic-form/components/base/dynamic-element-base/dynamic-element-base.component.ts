import {Component, Input, OnInit} from '@angular/core';
import {ComponentForm, DynamicFormGroup} from "@features/dynamic-form/models/formStructure.model";
import {generateRandomString} from "../../../utils/generateRandomString";

@Component({
  selector: 'app-dynamic-element-base',
  templateUrl: './dynamic-element-base.component.html',
  styleUrls: ['./dynamic-element-base.component.scss']
})
export class DynamicElementBaseComponent implements OnInit{
  @Input() form!: DynamicFormGroup;
  @Input() valuesForm!: any;
  @Input() component!: ComponentForm;
  @Input() uiForm : any

  componentToRender : any = null;
  name : string;
  constructor() {
  }

  ngOnInit(): void {
    this.componentToRender = this.uiForm?.uiComponents[this.component.properties?.type || 'button']?.renderComponent
    this.name = this.component?.properties?.groupSection ? `${this.component?.key || this.component?.properties?.key}_${generateRandomString()}` : this.component?.key
  }

}
