import {Component, Input, OnInit} from '@angular/core';
import {TabsStructure} from "@features/dynamic-form/models/formStructure.model";
import {separateColumnsByTabs} from "@features/dynamic-form/utils/separateColumnsByTabs";
import {getcolumnsWidth} from "@features/dynamic-form/utils/getcolumnsWidth";
import {DeviceDetectorService} from "ngx-device-detector";
import {FormGroup} from "@angular/forms";
import {
  GenericFormComponentComponent
} from "@features/dynamic-form/components/base/generic-form-component/generic-form-component.component";
import {FormService} from "@features/dynamic-form/services/form.service";
import {getFormValidationErrors} from "@features/dynamic-form/utils/getFormErrors";

@Component({
  selector: 'app-tabs-form',
  templateUrl: './tabs-form.component.html',
  styleUrls: ['./tabs-form.component.scss']
})
export class TabsFormComponent implements OnInit {
  @Input() fieldsForm!: any[][];
  @Input() form !: FormGroup;
  @Input() valuesForm !: any
  @Input() uiForm : any;

  tabs: TabsStructure = {};
  tabsWithErrors: any = {};
  active = 1;
  tabsInfo: any = [];
  classColumns: any[] = [];
  isMobile = false;

  constructor(private deviceService: DeviceDetectorService, private formService : FormService) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    this.getTabsStructure()
    this.formService.formSubmit$.subscribe(() => {
      this.getErrorsByTabs()
    })
  }

  getTabsStructure() {
    this.getColumnsWidthStyle()
    const tabsData = separateColumnsByTabs(this.fieldsForm, this.classColumns);
    this.tabs = tabsData[1]
    this.tabsInfo = tabsData[0]
  }

  getColumnsWidthStyle() {
    this.classColumns = getcolumnsWidth(this.fieldsForm)
  }

  getErrorsByTabs(){
    let tabErrors = {};
    const fieldsWithErrors : any =getFormValidationErrors(this.formService.getDynamicForm())

    const tabs : any = this.tabs;
    for (const tab in tabs) {
      for (const components of tabs[tab]){
        const componentsWithErrors = components?.filter(component => fieldsWithErrors.includes(component?.key || component?.properties?.key));
        if (componentsWithErrors.length > 0) {
          tabErrors[tab] = componentsWithErrors;
        }
      }
    }
    this.tabsWithErrors = tabErrors;
  }

  protected readonly GenericFormComponentComponent = GenericFormComponentComponent;
}
