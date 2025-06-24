import {TabsDynamicFormComponent} from "@shared/components/tabs-dynamic-form/tabs-dynamic-form.component";
import {LinealDynamicFormComponent} from "@shared/components/lineal-dynamic-form/lineal-dynamic-form.component";
import {InputTextComponent} from "@shared/components/atoms/input-text/input-text.component";
import {InputTextareaComponent} from "@shared/components/atoms/input-textarea/input-textarea.component";
import {InputDatepickerComponent} from "@shared/components/atoms/input-datepicker/input-datepicker.component";
import {
  InputDatetimepickerComponent
} from "@shared/components/atoms/input-datetimepicker/input-datetimepicker.component";
import {
  InputSelectMultipleComponent
} from "@shared/components/atoms/input-select-multiple/input-select-multiple.component";
import {InputCheckboxComponent} from "@shared/components/atoms/input-checkbox/input-checkbox.component";
import {InputCheckboxListComponent} from "@shared/components/atoms/input-checkbox-list/input-checkbox-list.component";
import {InputRadioListComponent} from "@shared/components/atoms/input-radio-list/input-radio-list.component";
import {InputFileUploadComponent} from "@shared/components/atoms/input-file-upload/input-file-upload.component";
import {InputFileViewerComponent} from "@shared/components/atoms/input-file-viewer/input-file-viewer.component";
import {MarkdownViewerComponent} from "@shared/components/atoms/markdown-viewer/markdown-viewer.component";
import {ButtonComponent} from "@shared/components/atoms/button/button.component";
import {InputEditorComponent} from "@shared/components/atoms/input-editor/input-editor.component";
import {AlertErrorComponent} from "@shared/components/atoms/alert-error/alert-error.component";
import {
  InputDocumentTemplateViewerComponent
} from "@shared/components/atoms/input-document-template-viewer/input-document-template-viewer.component";
import {
  InputSingleSelectionSelectComponent
} from "@shared/components/atoms/input-single-selection-select/input-single-selection-select.component";
import {InputDynamicTableComponent} from "@shared/components/atoms/input-dynamic-table/input-dynamic-table.component";
import {InputLocationMapComponent} from "@shared/components/molecules/input-location-map/input-location-map.component";
import {
  InputDynamicSectionComponent
} from "@shared/components/atoms/input-dynamic-section/input-dynamic-section.component";
import {AddressGeneratorComponent} from "@shared/components/organisms/address-generator/address-generator.component";

export const uiForms = {
  tabs : TabsDynamicFormComponent,
  lineal : LinealDynamicFormComponent
}

export const uiFormComponents  = {
  text: { renderComponent : InputTextComponent },
  email: {renderComponent : InputTextComponent},
  number: { renderComponent: InputTextComponent },
  digit: { renderComponent: InputTextComponent },
  currency: { renderComponent: InputTextComponent },
  tel: { renderComponent: InputTextComponent },
  textarea: {  renderComponent: InputTextareaComponent },
  datepicker: { renderComponent: InputDatepickerComponent },
  datetimepicker: {  renderComponent: InputDatetimepickerComponent },
  select: { renderComponent: InputSingleSelectionSelectComponent },
  selectMultiple: { renderComponent: InputSelectMultipleComponent },
  checkbox: { renderComponent: InputCheckboxComponent },
  checkboxList: { renderComponent: InputCheckboxListComponent },
  radioList: { renderComponent: InputRadioListComponent },
  dynamicTable : {renderComponent: InputDynamicTableComponent},
  dynamicSection : {renderComponent : InputDynamicSectionComponent},
  uploadFile: {  renderComponent: InputFileUploadComponent },
  viewerFile: { renderComponent: InputFileViewerComponent },
  markdown: {  renderComponent: MarkdownViewerComponent },
  downloadTemplate : { renderComponent : InputDocumentTemplateViewerComponent},
  editor : {renderComponent : InputEditorComponent},
  location : {renderComponent : InputLocationMapComponent},
  resultCalc : {renderComponent : InputTextComponent},
  resultTable : {renderComponent : InputTextComponent},
  button : {renderComponent : ButtonComponent},
  submit : {renderComponent : ButtonComponent},
  addressGenerator : {renderComponent : AddressGeneratorComponent},
  errorSubmitAlert : {renderComponent : AlertErrorComponent}
}
