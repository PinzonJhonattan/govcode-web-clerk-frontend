import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProceduresComponent} from './procedures/procedures.component';
import {CreateProceduresComponent} from './procedures/create-procedures/create-procedures.component';
import {PersonTypesComponent} from './lists/person-types/person-types.component';
import {CreatePersonTypeComponent} from './lists/person-types/create-person-type/create-person-type.component';
import {ProcedureTypesComponent} from './lists/procedure-types/procedure-types.component';
import {
  CreateProcedureTypesComponent
} from './lists/procedure-types/create-procedure-types/create-procedure-types.component';
import {IdentificationTypesComponent} from './lists/identification-types/identification-types.component';
import {
  CreateIdentificationTypesComponent
} from './lists/identification-types/create-identification-types/create-identification-types.component';
import {
  LegalRepresentativeTypesComponent
} from './lists/legal-representative-types/legal-representative-types.component';
import {
  CreateLegalRepresentativeTypesComponent
} from './lists/legal-representative-types/create-legal-representative-types/create-legal-representative-types.component';
import {PropertyQualityTypesComponent} from './lists/property-quality-types/property-quality-types.component';
import {
  CreatePropertyQualityTypesComponent
} from './lists/property-quality-types/create-property-quality-types/create-property-quality-types.component';
import {WaterSourcesComponent} from './lists/water-sources/water-sources.component';
import {CreateWaterSourcesComponent} from './lists/water-sources/create-water-sources/create-water-sources.component';
import {DischargeTypesComponent} from './lists/discharge-types/discharge-types.component';
import {
  CreateDischargeTypesComponent
} from './lists/discharge-types/create-discharge-types/create-discharge-types.component';
import {DischargeFlowTypesComponent} from './lists/discharge-flow-types/discharge-flow-types.component';
import {
  CreateDischargeFlowTypesComponent
} from './lists/discharge-flow-types/create-discharge-flow-types/create-discharge-flow-types.component';
import {TypeActivitiesComponent} from './lists/type-activities/type-activities.component';
import {
  CreateTypeActivitiesComponent
} from './lists/type-activities/create-type-activities/create-type-activities.component';
import {AdminListsComponent} from './admin-lists/admin-lists.component';
import {AdminFormListsComponent} from './admin-lists/admin-form-lists/admin-form-lists.component';
import {AdminTemplatesComponent} from './admin-templates/admin-templates.component';
import {FormTemplatesComponent} from './admin-templates/form-templates/form-templates.component';
import {AdminSignaturesComponent} from './admin-signatures/admin-signatures.component';
import {FormSignaturesComponent} from './admin-signatures/form-signatures/form-signatures.component';
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";
import requiredRouteRoles from "@core/guard/requiredRouteRoles";

const routes: Routes = [
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_PROCEDURES], strategy : 'all'})],
    path: 'tramites',
    component: ProceduresComponent,
  },
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_EDIT_PROCEDURES], strategy : 'all'})],
    path: 'tramites/edit/:id',
    component: CreateProceduresComponent,
  },
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_PROCEDURES], strategy : 'all'})],
    path: 'tramites/review/:id',
    component: CreateProceduresComponent,
  },
  // --------------------------------------
  {
    path: 'person-types',
    component: PersonTypesComponent
  },
  {
    path: 'person-types/edit/:id',
    component: CreatePersonTypeComponent
  },
  {
    path: 'person-types/review/:id',
    component: CreatePersonTypeComponent
  },
  // --------------------------------------
  {
    path: 'procedure-types',
    component: ProcedureTypesComponent
  },
  {
    path: 'procedure-types/edit/:id',
    component: CreateProcedureTypesComponent
  },
  {
    path: 'procedure-types/review/:id',
    component: CreateProcedureTypesComponent
  },
  // --------------------------------------
  {
    path: 'identification-types',
    component: IdentificationTypesComponent
  },
  {
    path: 'identification-types/edit/:id',
    component: CreateIdentificationTypesComponent
  },
  {
    path: 'identification-types/review/:id',
    component: CreateIdentificationTypesComponent
  },
  // --------------------------------------
  {
    path: 'legal-representative-types',
    component: LegalRepresentativeTypesComponent
  },
  {
    path: 'legal-representative-types/edit/:id',
    component: CreateLegalRepresentativeTypesComponent
  },
  {
    path: 'legal-representative-types/review/:id',
    component: CreateLegalRepresentativeTypesComponent
  },
  // --------------------------------------
  {
    path: 'property-quality-types',
    component: PropertyQualityTypesComponent
  },
  {
    path: 'property-quality-types/edit/:id',
    component: CreatePropertyQualityTypesComponent
  },
  {
    path: 'property-quality-types/review/:id',
    component: CreatePropertyQualityTypesComponent
  },
  // --------------------------------------
  {
    path: 'water-sources',
    component: WaterSourcesComponent
  },
  {
    path: 'water-sources/edit/:id',
    component: CreateWaterSourcesComponent
  },
  {
    path: 'water-sources/review/:id',
    component: CreateWaterSourcesComponent
  },
  // --------------------------------------
  {
    path: 'discharge-types',
    component: DischargeTypesComponent
  },
  {
    path: 'discharge-types/edit/:id',
    component: CreateDischargeTypesComponent
  },
  {
    path: 'discharge-types/review/:id',
    component: CreateDischargeTypesComponent
  },
  // --------------------------------------
  {
    path: 'discharge-flow-types',
    component: DischargeFlowTypesComponent
  },
  {
    path: 'discharge-flow-types/edit/:id',
    component: CreateDischargeFlowTypesComponent
  },
  {
    path: 'discharge-flow-types/review/:id',
    component: CreateDischargeFlowTypesComponent
  },
  // --------------------------------------
  {
    path: 'type-activities',
    component: TypeActivitiesComponent
  },
  {
    path: 'type-activities/edit/:id',
    component: CreateTypeActivitiesComponent
  },
  {
    path: 'type-activities/review/:id',
    component: CreateTypeActivitiesComponent
  },
  // --------------------------------------
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_TEMPLATES], strategy : 'all'})],
    path: 'admin-templates',
    component: AdminTemplatesComponent
  },
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_CREATE_TEMPLATES], strategy : 'all'})],
    path: 'create-template',
    component: FormTemplatesComponent
  },
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_EDIT_PROCEDURES], strategy : 'all'})],
    path: 'admin-templates/edit/:id',
    component: FormTemplatesComponent
  },
  // --------------------------------------
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_SIGNATURES], strategy : 'all'})],
    path: 'admin-signatures',
    component: AdminSignaturesComponent
  },
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_CREATE_SIGNATURES], strategy : 'all'})],
    path: 'create-signature',
    component: FormSignaturesComponent
  },
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_EDIT_SIGNATURES], strategy : 'all'})],
    path: 'admin-signatures/edit/:id',
    component: FormSignaturesComponent
  },
  // --------------------------------------
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_VIEW_SIGNATURES], strategy : 'all'})],
    path: 'admin-lists',
    component: AdminListsComponent
  },
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_CREATE_SIGNATURES], strategy : 'all'})],
    path: 'create-admin-lists',
    component: AdminFormListsComponent
  },
  {
    canActivate : [requiredRouteRoles({roles : [APP_ROLES_PERMISSIONS.APP_EDIT_LISTS], strategy : 'all'})],
    path: 'admin-lists/edit/:id',
    component: AdminFormListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBasicDataRoutingModule { }
