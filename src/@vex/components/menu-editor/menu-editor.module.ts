import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MenuEditorModalComponent } from './menu-editor-modal.component';
import { MenuEditorComponent } from './menu-editor.component';
import { JsonExampleModalComponent } from './json-example-modal.component';

@NgModule({
  declarations: [
    MenuEditorModalComponent,
    MenuEditorComponent,
    JsonExampleModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [
    MenuEditorModalComponent,
    MenuEditorComponent,
    JsonExampleModalComponent
  ]
})
export class MenuEditorModule { }
