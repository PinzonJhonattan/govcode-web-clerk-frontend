import {TextFieldComponent} from "@features/dynamic-form/components/fields/text-field/text-field.component";
import {NumberFieldComponent} from "@features/dynamic-form/components/fields/number-field/number-field.component";
import {TextareaFieldComponent} from "@features/dynamic-form/components/fields/textarea-field/textarea-field.component";
import {EmailFieldComponent} from "@features/dynamic-form/components/fields/email-field/email-field.component";
import {PhoneFieldComponent} from "@features/dynamic-form/components/fields/phone-field/phone-field.component";
import {DatepickerFieldComponent} from "@features/dynamic-form/components/fields/datepicker-field/datepicker-field.component";
import {
  DatetimepickerFieldComponent
} from "@features/dynamic-form/components/fields/datetimepicker-field/datetimepicker-field.component";
import {EditorFieldComponent} from "@features/dynamic-form/components/fields/editor-field/editor-field.component";
import {CheckboxFieldComponent} from "@features/dynamic-form/components/fields/checkbox-field/checkbox-field.component";
import {
  FileUploadFieldComponent
} from "@features/dynamic-form/components/fields/file-upload-field/file-upload-field.component";
import {ButtonElementComponent} from "@features/dynamic-form/components/elements/button-element/button-element.component";
import {SubmitButtonComponent} from "@features/dynamic-form/components/elements/submit-button/submit-button.component";
import {SelectFieldComponent} from "@features/dynamic-form/components/fields/select-field/select-field.component";
import {
  SelectMultipleField
} from "@features/dynamic-form/components/fields/select-multiple-field/select-multiple-field";
import {
  MarkdownViewerBlockComponent
} from "@features/dynamic-form/components/elements/markdown-viewer-block/markdown-viewer-block.component";
import {DigitFieldComponent} from "@features/dynamic-form/components/fields/digit-field/digit-field.component";
import {CurrencyFieldComponent} from "@features/dynamic-form/components/fields/currency-field/currency-field.component";
import {CheckboxListComponent} from "@features/dynamic-form/components/fields/checkbox-list/checkbox-list.component";
import {
  RadioListFieldComponent
} from "@features/dynamic-form/components/fields/radio-list-field/radio-list-field.component";
import {
  ResultCalcFieldComponent
} from "@features/dynamic-form/components/fields/result-calc-field/result-calc-field.component";
import {
  DocumentTemplateViewComponent
} from "@features/dynamic-form/components/elements/document-template-view/document-template-view.component";
import {
  DynamicTableFieldComponent
} from "@features/dynamic-form/components/elements/dynamic-table-field/dynamic-table-field.component";
import {ResultTableComponent} from "@features/dynamic-form/components/fields/result-table/result-table.component";
import {
  LocationMapFieldComponent
} from "@features/dynamic-form/components/fields/location-map-field/location-map-field.component";
import {
  DynamicSectionComponent
} from "@features/dynamic-form/components/elements/dynamic-section/dynamic-section.component";
import {OpenModalComponent} from "@features/dynamic-form/components/elements/button-modal/open-modal.component";
import { FileViewFieldComponent } from "../components/fields/file-view-field/file-view-field.component";

export const formComponents: any = {
  text: { mode: 'field', component: TextFieldComponent },
  email: { mode: 'field', component: EmailFieldComponent },
  number: { mode: 'field', component: NumberFieldComponent },
  digit: { mode: 'field', component: DigitFieldComponent },
  currency: { mode: 'field', component: CurrencyFieldComponent },
  tel: { mode: 'field', component: PhoneFieldComponent },
  textarea: { mode: 'field', component: TextareaFieldComponent },
  datepicker: { mode: 'field', component: DatepickerFieldComponent },
  datetimepicker: { mode: 'field', component: DatetimepickerFieldComponent },
  select: { mode: 'field', component: SelectFieldComponent },
  selectMultiple: { mode: 'field', component: SelectMultipleField },
  checkbox: { mode: 'field', component: CheckboxFieldComponent },
  checkboxList: { mode: 'field', component: CheckboxListComponent },
  radioList: { mode: 'field', component: RadioListFieldComponent },
  uploadFile: { mode: 'field', component: FileUploadFieldComponent },
  editor: { mode: 'field', component: EditorFieldComponent },
  resultCalc: { mode: 'field', component: ResultCalcFieldComponent },
  location : {mode : 'field', component : LocationMapFieldComponent},
  resultTable: { mode: 'field', component: ResultTableComponent },
  dynamicTable : {mode : 'block', component : DynamicTableFieldComponent},
  dynamicSection : {mode : 'block', component : DynamicSectionComponent},
  downloadTemplate : {mode : 'block', component : DocumentTemplateViewComponent},
  viewerFile: { mode: 'field', component: FileViewFieldComponent },
  openModal: { mode: 'block', component: OpenModalComponent },
  markdown: { mode: 'block', component: MarkdownViewerBlockComponent },
  button: { mode: 'block', component: ButtonElementComponent },
  submit: { mode: 'block', component: SubmitButtonComponent }
}
