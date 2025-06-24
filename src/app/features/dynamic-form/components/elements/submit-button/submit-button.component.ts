import {Component, OnInit} from '@angular/core';
import {
  DynamicElementBaseComponent
} from "@features/dynamic-form/components/base/dynamic-element-base/dynamic-element-base.component";

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent extends DynamicElementBaseComponent implements OnInit{

  dynamicProps : any;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();

    this.dynamicProps = {
      text : this.component?.label,
      type : 'submit'
    }
  }

}
