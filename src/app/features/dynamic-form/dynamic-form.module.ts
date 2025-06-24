import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DynamicFormRoutingModule } from "./dynamic-form-routing.module";
import { DynamicFormComponent } from "./dynamic-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TabsFormComponent } from '@features/dynamic-form/components/forms/tabs-form/tabs-form.component';
import { LinealFormComponent } from '@features/dynamic-form/components/forms/lineal-form/lineal-form.component';
import { FormDirective } from './directives/form.directive';
import { TextFieldComponent } from '@features/dynamic-form/components/fields/text-field/text-field.component';
import { NumberFieldComponent } from '@features/dynamic-form/components/fields/number-field/number-field.component';
import { TextareaFieldComponent } from '@features/dynamic-form/components/fields/textarea-field/textarea-field.component';
import { EmailFieldComponent } from '@features/dynamic-form/components/fields/email-field/email-field.component';
import {DynamicIoModule, DynamicModule} from "ng-dynamic-component";
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";
import { PhoneFieldComponent } from '@features/dynamic-form/components/fields/phone-field/phone-field.component';
import { DynamicElementBaseComponent } from '@features/dynamic-form/components/base/dynamic-element-base/dynamic-element-base.component';
import { DatepickerFieldComponent } from '@features/dynamic-form/components/fields/datepicker-field/datepicker-field.component';
import { DatetimepickerFieldComponent } from '@features/dynamic-form/components/fields/datetimepicker-field/datetimepicker-field.component';
import { EditorFieldComponent } from '@features/dynamic-form/components/fields/editor-field/editor-field.component';
import { CheckboxFieldComponent } from '@features/dynamic-form/components/fields/checkbox-field/checkbox-field.component';
import {
  FileUploadFieldComponent
} from "@features/dynamic-form/components/fields/file-upload-field/file-upload-field.component";
import { ButtonElementComponent } from './components/elements/button-element/button-element.component';
import { SubmitButtonComponent } from './components/elements/submit-button/submit-button.component';
import {LinealInTabFormDirective} from "@features/dynamic-form/directives/linealInTabForm.directive";
import {SelectFieldComponent} from "@features/dynamic-form/components/fields/select-field/select-field.component";
import {
  SelectMultipleField
} from "@features/dynamic-form/components/fields/select-multiple-field/select-multiple-field";
import {
  MarkdownViewerBlockComponent
} from "@features/dynamic-form/components/elements/markdown-viewer-block/markdown-viewer-block.component";
import { DigitFieldComponent } from './components/fields/digit-field/digit-field.component';
import { CurrencyFieldComponent } from './components/fields/currency-field/currency-field.component';
import { CheckboxListComponent } from './components/fields/checkbox-list/checkbox-list.component';
import { RadioListFieldComponent } from './components/fields/radio-list-field/radio-list-field.component';
import { ErrorSubmitAlertComponent } from '@features/dynamic-form/components/defaultComponents/error-submit-alert/error-submit-alert.component';
import { GenericFormComponentComponent } from './components/base/generic-form-component/generic-form-component.component';
import { MatIconModule } from '@angular/material/icon';
import { ResultCalcFieldComponent } from './components/fields/result-calc-field/result-calc-field.component';
import { DocumentTemplateViewComponent } from './components/elements/document-template-view/document-template-view.component';
import { DynamicTableFieldComponent } from '@features/dynamic-form/components/elements/dynamic-table-field/dynamic-table-field.component';
import { ResultTableComponent } from './components/fields/result-table/result-table.component';
import { LocationMapFieldComponent } from './components/fields/location-map-field/location-map-field.component';
import { DynamicSectionComponent } from './components/elements/dynamic-section/dynamic-section.component';
import { RecaptchaFieldComponent } from './components/fields/recaptcha-field/recaptcha-field.component';
import { SharedModule } from "@shared/shared.module";
import {OpenModalComponent} from "@features/dynamic-form/components/elements/button-modal/open-modal.component";
import { FileViewFieldComponent } from "./components/fields/file-view-field/file-view-field.component";

@NgModule({
  declarations: [DynamicFormComponent, DynamicFieldBaseComponentComponent, OpenModalComponent, TabsFormComponent, LinealFormComponent, FormDirective, LinealInTabFormDirective, TextFieldComponent, NumberFieldComponent, TextareaFieldComponent, EmailFieldComponent, PhoneFieldComponent, DynamicElementBaseComponent, DatepickerFieldComponent, FileViewFieldComponent, DatetimepickerFieldComponent, SelectFieldComponent, EditorFieldComponent, CheckboxFieldComponent, FileUploadFieldComponent, ButtonElementComponent, SubmitButtonComponent, SelectMultipleField, MarkdownViewerBlockComponent, DigitFieldComponent, CurrencyFieldComponent, CheckboxListComponent, RadioListFieldComponent, ErrorSubmitAlertComponent, GenericFormComponentComponent, ResultCalcFieldComponent, DocumentTemplateViewComponent, DynamicTableFieldComponent, ResultTableComponent, LocationMapFieldComponent, DynamicSectionComponent, RecaptchaFieldComponent],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    ReactiveFormsModule,
    DynamicModule,
    DynamicIoModule,
    MatIconModule,
    SharedModule
  ],
  exports: [DynamicFormComponent, ButtonElementComponent]
})
export class DynamicFormModule {}
