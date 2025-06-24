import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormResponsesComponent } from "./form-response.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { BreadcrumbsModule } from "@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "@vex/components/page-layout/page-layout.module";
import { ComponentsModule } from "@shared/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: FormResponsesComponent,
    data: {
      toolbarShadowEnabled: false,
    },
  },
  {
    path: ":formId",
    component: FormResponsesComponent,
    data: {
      toolbarShadowEnabled: false,
    },
  },
];

@NgModule({
  declarations: [FormResponsesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BreadcrumbsModule,
    PageLayoutModule,
    ComponentsModule,
  ],
})
export class FormResponsesModule {}
