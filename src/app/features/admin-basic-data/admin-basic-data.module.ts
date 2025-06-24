import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBasicDataRoutingModule } from './admin-basic-data-routing.module';
import { ProceduresComponent } from './procedures/procedures.component';
import { PageLayoutModule } from '@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from '@vex/components/breadcrumbs/breadcrumbs.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ListOfProceduresComponent } from './procedures/list-of-procedures/list-of-procedures.component';
import { ComplexTableModule } from '@shared/components/complex-table/complex-table.module';
import { CreateProceduresComponent } from './procedures/create-procedures/create-procedures.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonTypesComponent } from './lists/person-types/person-types.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListOfPersonTypesComponent } from './lists/person-types/list-of-person-types/list-of-person-types.component';
import { CreatePersonTypeComponent } from './lists/person-types/create-person-type/create-person-type.component';
import { ProcedureTypesComponent } from './lists/procedure-types/procedure-types.component';
import { ListOfProcedureTypesComponent } from './lists/procedure-types/list-of-procedure-types/list-of-procedure-types.component';
import { CreateProcedureTypesComponent } from './lists/procedure-types/create-procedure-types/create-procedure-types.component';
import { IdentificationTypesComponent } from './lists/identification-types/identification-types.component';
import { CreateIdentificationTypesComponent } from './lists/identification-types/create-identification-types/create-identification-types.component';
import { ListOfIdentificationTypesComponent } from './lists/identification-types/list-of-identification-types/list-of-identification-types.component';
import { LegalRepresentativeTypesComponent } from './lists/legal-representative-types/legal-representative-types.component';
import { CreateLegalRepresentativeTypesComponent } from './lists/legal-representative-types/create-legal-representative-types/create-legal-representative-types.component';
import { ListOfLegalRepresentativeTypesComponent } from './lists/legal-representative-types/list-of-legal-representative-types/list-of-legal-representative-types.component';
import { PropertyQualityTypesComponent } from './lists/property-quality-types/property-quality-types.component';
import { CreatePropertyQualityTypesComponent } from './lists/property-quality-types/create-property-quality-types/create-property-quality-types.component';
import { ListOfPropertyQualityTypesComponent } from './lists/property-quality-types/list-of-property-quality-types/list-of-property-quality-types.component';
import { WaterSourcesComponent } from './lists/water-sources/water-sources.component';
import { ListOfWaterSourcesComponent } from './lists/water-sources/list-of-water-sources/list-of-water-sources.component';
import { CreateWaterSourcesComponent } from './lists/water-sources/create-water-sources/create-water-sources.component';
import { DischargeTypesComponent } from './lists/discharge-types/discharge-types.component';
import { CreateDischargeTypesComponent } from './lists/discharge-types/create-discharge-types/create-discharge-types.component';
import { ListOfDischargeTypesComponent } from './lists/discharge-types/list-of-discharge-types/list-of-discharge-types.component';
import { DischargeFlowTypesComponent } from './lists/discharge-flow-types/discharge-flow-types.component';
import { CreateDischargeFlowTypesComponent } from './lists/discharge-flow-types/create-discharge-flow-types/create-discharge-flow-types.component';
import { ListOfDischargeFlowTypesComponent } from './lists/discharge-flow-types/list-of-discharge-flow-types/list-of-discharge-flow-types.component';
import { TypeActivitiesComponent } from './lists/type-activities/type-activities.component';
import { CreateTypeActivitiesComponent } from './lists/type-activities/create-type-activities/create-type-activities.component';
import { ListOfTypeActivitiesComponent } from './lists/type-activities/list-of-type-activities/list-of-type-activities.component';
import { AdminListsComponent } from './admin-lists/admin-lists.component';
import { ListOfAdminListsComponent } from './admin-lists/list-of-admin-lists/list-of-admin-lists.component';
import { AdminFormListsComponent } from './admin-lists/admin-form-lists/admin-form-lists.component';
import { EditListNameFormComponent } from './admin-lists/edit-list-name-form/edit-list-name-form.component';
import { AdminTemplatesComponent } from './admin-templates/admin-templates.component';
import { ListOfTemplatesComponent } from './admin-templates/list-of-templates/list-of-templates.component';
import { FormTemplatesComponent } from './admin-templates/form-templates/form-templates.component';
import { AdminSignaturesComponent } from './admin-signatures/admin-signatures.component';
import { ListOfSignaturesComponent } from './admin-signatures/list-of-signatures/list-of-signatures.component';
import { FormSignaturesComponent } from './admin-signatures/form-signatures/form-signatures.component';
import { ModalNewItemListComponent } from './admin-lists/admin-form-lists/modal-new-item-list/modal-new-item-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ProceduresComponent,
    ListOfProceduresComponent,
    CreateProceduresComponent,
    PersonTypesComponent,
    ListOfPersonTypesComponent,
    CreatePersonTypeComponent,
    ProcedureTypesComponent,
    ListOfProcedureTypesComponent,
    CreateProcedureTypesComponent,
    IdentificationTypesComponent,
    CreateIdentificationTypesComponent,
    ListOfIdentificationTypesComponent,
    LegalRepresentativeTypesComponent,
    CreateLegalRepresentativeTypesComponent,
    ListOfLegalRepresentativeTypesComponent,
    PropertyQualityTypesComponent,
    CreatePropertyQualityTypesComponent,
    ListOfPropertyQualityTypesComponent,
    WaterSourcesComponent,
    ListOfWaterSourcesComponent,
    CreateWaterSourcesComponent,
    DischargeTypesComponent,
    CreateDischargeTypesComponent,
    ListOfDischargeTypesComponent,
    DischargeFlowTypesComponent,
    CreateDischargeFlowTypesComponent,
    ListOfDischargeFlowTypesComponent,
    TypeActivitiesComponent,
    CreateTypeActivitiesComponent,
    ListOfTypeActivitiesComponent,
    AdminListsComponent,
    ListOfAdminListsComponent,
    AdminFormListsComponent,
    EditListNameFormComponent,
    AdminTemplatesComponent,
    ListOfTemplatesComponent,
    FormTemplatesComponent,
    AdminSignaturesComponent,
    ListOfSignaturesComponent,
    FormSignaturesComponent,
    ModalNewItemListComponent,
  ],
    imports: [
        AdminBasicDataRoutingModule,
        BreadcrumbsModule,
        ComplexTableModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        PageLayoutModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        SharedModule,
    ]
})
export class AdminBasicDataModule { }
