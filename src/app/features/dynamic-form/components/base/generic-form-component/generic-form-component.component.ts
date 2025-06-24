import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  NgZone
} from '@angular/core';
import {ComponentForm, DynamicFormGroup} from "@features/dynamic-form/models/formStructure.model";
import {formComponents} from "@features/dynamic-form/constants/formComponents";
import {DeviceDetectorService} from "ngx-device-detector";
import {isHideComponent} from "@features/dynamic-form/utils/verifyIfHideComponent";
import {Subscription} from "rxjs";
import {FormService} from "@features/dynamic-form/services/form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-generic-form-component',
  templateUrl: './generic-form-component.component.html',
  styleUrls: ['./generic-form-component.component.scss']
})
export class GenericFormComponentComponent implements OnInit, OnDestroy{

  @Input() valuesForm!: any;
  @Input() component!: ComponentForm;
  @Input() uiForm: any
  @Input() referenceContainerComponent: any;

  isMobile: boolean = false;
  isHide: boolean = false;
  lastIsHide: boolean = false;
  valuesVariables: any = null;
  subscribedForm: Subscription;
  form: FormGroup;

  constructor(private deviceService: DeviceDetectorService, private changeDetectorRef: ChangeDetectorRef, private formService: FormService, private ngZone: NgZone) {
    this.isMobile = this.deviceService.isMobile();
    this.form = this.formService.getDynamicForm();

  }

  ngOnInit(): void {
    if (this.component?.conditional?.hide) {
      this.valuesVariables = Object.fromEntries(Object.entries(this.valuesForm).map(([name, value]: any) => [name, value.value]));
     this.subscribedForm = this.form?.valueChanges?.subscribe(async (data) => {
        this.isHide = await this.hideComponentsByCondition();
        this.updateView()
      })
    }
  }
  async hideComponentsByCondition() {
      if (!this.component?.conditional?.hide) return false;
      return isHideComponent(this.form, this.component, this.valuesVariables);
  }

  updateView(){
    const divElement = this.referenceContainerComponent;
    if (!divElement) return;

    if (this.isHide) {
      const elementsBlock = Array.from(divElement.parentElement?.childNodes as NodeList).find(element => (element as HTMLElement)?.style?.display != 'none' && (element as HTMLElement)?.className?.includes('component-container'));
      if (divElement.parentElement && !elementsBlock) {
        divElement.parentElement.style.display = 'none';
      }
      divElement.style.display = 'none';
    } else {
      if (divElement.style.display == 'none') {
        if (divElement.parentElement) {
          divElement.parentElement.style.display = 'flex';
        }
        divElement.style.display = 'block';
      }
    }
  }
  ngOnDestroy() {
    if (this.subscribedForm) {
      this.subscribedForm.unsubscribe()
    }
  }
  protected readonly formComponents = formComponents;
}
