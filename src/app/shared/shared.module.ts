import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ComplexTableComponent} from "./components/complex-table/complex-table.component";
import {ComplexTableModule} from "./components/complex-table/complex-table.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "./components/components.module";
import {NzImageModule} from "ng-zorro-antd/image";
import {ErrorStateMatcher} from "@angular/material/core";
import {ErrorStateMatcherFields} from "@shared/custom/ErrorStateMatcherFields";
import { UserHasPermissionsDirective } from './directives/user-has-permissions.directive';

@NgModule({
  declarations: [
    UserHasPermissionsDirective
  ],
  imports: [CommonModule, ComplexTableModule, ReactiveFormsModule, NzImageModule,

  ],
  exports: [ComplexTableComponent, ComponentsModule, UserHasPermissionsDirective],
  providers: [
    {provide: ErrorStateMatcher, useClass: ErrorStateMatcherFields}
  ]
})
export class SharedModule {
}
