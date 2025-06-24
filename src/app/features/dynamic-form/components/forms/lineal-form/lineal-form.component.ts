import {Component, Input, OnInit} from '@angular/core';
import {formComponents} from "@features/dynamic-form/constants/formComponents";
import {getcolumnsWidth} from "@features/dynamic-form/utils/getcolumnsWidth";
import {DynamicFormGroup} from "@features/dynamic-form/models/formStructure.model";
import {
  GenericFormComponentComponent
} from "@features/dynamic-form/components/base/generic-form-component/generic-form-component.component";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-lineal-form',
  templateUrl: './lineal-form.component.html',
  styleUrls: ['./lineal-form.component.scss']
})
export class LinealFormComponent implements OnInit {
  @Input() fieldsForm: any[][] = [];
  @Input() form !: DynamicFormGroup
  @Input() valuesForm !: any
  @Input() uiForm : any;

  formComponents: any = formComponents
  classColumns : any[] = []
  components : any[][] = [];
  isMobile = false;

  constructor(private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    this.getColumnsWidthStyle()
    let processComponents : any[] = [];
    this.fieldsForm.forEach((row : any, rowIndex) => {
      let columns : any = [];
      row.forEach((column : any, columnIndex : number) => {
        columns.push({...column, layout : { numColumns : this.classColumns[rowIndex][columnIndex]}})
      })
      processComponents.push(columns)
    })
    this.components = processComponents
  }

  getColumnsWidthStyle() {
    this.classColumns = getcolumnsWidth(this.fieldsForm)
  }

  protected readonly GenericFormComponentComponent = GenericFormComponentComponent;
}
