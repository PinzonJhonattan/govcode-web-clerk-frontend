import { Component, OnInit } from '@angular/core';
import {
  DynamicElementBaseComponent
} from "@features/dynamic-form/components/base/dynamic-element-base/dynamic-element-base.component";

@Component({
  selector: 'app-button-modal',
  templateUrl: './open-modal.component.html',
  styleUrls: ['./open-modal.component.scss']
})
export class OpenModalComponent extends DynamicElementBaseComponent implements OnInit {

  dynamicProps : any;
  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.componentToRender = this.uiForm?.uiComponents[this.component.properties?.modalComponent]?.renderComponent

    this.dynamicProps = {
      form : this.form,
      groupSection : this.component?.properties?.groupSection || this.form,
      propertiesComponent : this.component?.properties,
    }
  }
}

