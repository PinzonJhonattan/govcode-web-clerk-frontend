import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewReportComponent } from './view-report/view-report.component';
import { MatIconModule } from '@angular/material/icon';
import { SafePipe } from '../pipes/SafePipe.pipe';
import { InputTextComponent } from './atoms/input-text/input-text.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { InputCheckboxComponent } from './atoms/input-checkbox/input-checkbox.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { InputSelectMultipleComponent } from './atoms/input-select-multiple/input-select-multiple.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { InputSelectComponent } from './atoms/input-select/input-select.component';
import { InputFileUploadComponent } from './atoms/input-file-upload/input-file-upload.component';
import { InputFileViewerComponent } from './atoms/input-file-viewer/input-file-viewer.component';
import { InputDatetimepickerComponent } from './atoms/input-datetimepicker/input-datetimepicker.component';
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import { MarkdownViewerComponent } from './atoms/markdown-viewer/markdown-viewer.component';
import {MarkdownModule} from "ngx-markdown";
import {NgxMaskModule} from "ngx-mask";
import { InputCheckboxListComponent } from './atoms/input-checkbox-list/input-checkbox-list.component';
import {MatListModule} from "@angular/material/list";
import {InputRadioListComponent} from "@shared/components/atoms/input-radio-list/input-radio-list.component";
import {MatRadioModule} from "@angular/material/radio";
import { InputTextareaComponent } from './atoms/input-textarea/input-textarea.component';
import { InputDatepickerComponent } from './atoms/input-datepicker/input-datepicker.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import { TabsDynamicFormComponent } from './tabs-dynamic-form/tabs-dynamic-form.component';
import {PageLayoutModule} from "@vex/components/page-layout/page-layout.module";
import {MatTabsModule} from "@angular/material/tabs";
import { LinealDynamicFormComponent } from './lineal-dynamic-form/lineal-dynamic-form.component';
import { ButtonComponent } from './atoms/button/button.component';
import { InputEditorComponent } from './atoms/input-editor/input-editor.component';
import {DynamicModule} from "ng-dynamic-component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CkEditorComponent} from "@shared/components/ck-editor/ck-editor.component";
import {AlertErrorComponent} from "@shared/components/atoms/alert-error/alert-error.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { SignSendButtonComponent } from './atoms/sign-send-button/sign-send-button.component';
import { InputDocumentTemplateViewerComponent } from './atoms/input-document-template-viewer/input-document-template-viewer.component';
import { InputSelectSearchComponent } from './atoms/input-select-search/input-select-search.component';
// import {N gxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InputSingleSelectionSelectComponent } from './atoms/input-single-selection-select/input-single-selection-select.component';
import { InputDynamicTableComponent } from './atoms/input-dynamic-table/input-dynamic-table.component';
import {MatTableModule} from '@angular/material/table';
import { LeafletMapComponent } from './atoms/leaflet-map/leaflet-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { InputLocationMapComponent } from './molecules/input-location-map/input-location-map.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MapLocationDialogComponent } from './organisms/map-location-dialog/map-location-dialog.component';
import { InputDynamicSectionComponent } from './atoms/input-dynamic-section/input-dynamic-section.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalComponent } from './organisms/modal/modal.component';
import {AddressGeneratorComponent} from "@shared/components/organisms/address-generator/address-generator.component";
import {
  ModalAddressGeneratorComponent
} from "@shared/components/organisms/address-generator/modal-address-generator/modal-address-generator.component";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {ReportChartsComponent} from "@shared/components/report-charts/report-charts.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatOptionModule,
    NgxMatTimepickerModule,
    MarkdownModule.forRoot(),
    NgxMaskModule.forRoot(),
    MatListModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonModule,
    PageLayoutModule,
    MatTabsModule,
    DynamicModule,
    CKEditorModule,
    MatButtonToggleModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    LeafletModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
  ],
  declarations: [
    ViewReportComponent,       ReportChartsComponent,
    SafePipe, AlertErrorComponent, CkEditorComponent,InputTextComponent, InputCheckboxComponent, AddressGeneratorComponent, InputSelectMultipleComponent, InputSelectComponent, InputFileUploadComponent, InputFileViewerComponent, InputDatetimepickerComponent, MarkdownViewerComponent, InputCheckboxListComponent, InputRadioListComponent, InputTextareaComponent, InputDatepickerComponent, TabsDynamicFormComponent, LinealDynamicFormComponent, ButtonComponent, InputEditorComponent, SignSendButtonComponent, InputDocumentTemplateViewerComponent, InputSelectSearchComponent, InputSingleSelectionSelectComponent, InputDynamicTableComponent, LeafletMapComponent, InputLocationMapComponent, MapLocationDialogComponent, InputDynamicSectionComponent, ModalComponent, ModalAddressGeneratorComponent
  ],
    exports: [
        ViewReportComponent,
      ReportChartsComponent,
        InputTextComponent,
        InputCheckboxComponent,
        InputSelectComponent,
        InputFileUploadComponent,
        InputFileViewerComponent,
        InputDatetimepickerComponent,
        MarkdownViewerComponent,
        InputCheckboxListComponent,
        InputRadioListComponent,
        InputSelectSearchComponent,
        InputTextareaComponent,
        InputDatepickerComponent,
        InputSelectMultipleComponent,
        TabsDynamicFormComponent,
        CkEditorComponent,
        AlertErrorComponent,
        LeafletMapComponent,
        ModalComponent,
        ButtonComponent
    ],
  providers : [
    DatePipe
  ]
})
export class ComponentsModule {}
