import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormViewerComponent } from './form-viewer.component';
import { RouterModule, Routes } from '@angular/router'; // Añadir Routes
import { DynamicFormModule } from '@features/dynamic-form/dynamic-form.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbsModule } from '@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '@vex/components/page-layout/page-layout.module';
import { ComponentsModule } from '@shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: FormViewerComponent,
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: ':formId',
    component: FormViewerComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];

@NgModule({
  declarations: [
    FormViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    DynamicFormModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    BreadcrumbsModule,
    PageLayoutModule,
    ComponentsModule
  ]
})
export class FormViewerModule { }
