import { Component, OnInit } from '@angular/core';
import {
  DynamicElementBaseComponent
} from "@features/dynamic-form/components/base/dynamic-element-base/dynamic-element-base.component";

@Component({
  selector: 'app-button-element',
  templateUrl: './button-element.component.html',
  styleUrls: ['./button-element.component.scss']
})
export class ButtonElementComponent extends DynamicElementBaseComponent implements OnInit{

  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      text : this.component.label,
      type : this.component?.properties?.type
    }
  }
}
