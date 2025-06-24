import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedUsersComponent } from './authorized-users/authorized-users.component';
import { ListOfAuthorizedUsersComponent } from './authorized-users/list-of-authorized-users/list-of-authorized-users.component';
import { CreateAuthorizedUsersComponent } from './authorized-users/create-authorized-users/create-authorized-users.component';
import { ManageLicensesRoutingModule } from './manage-licenses-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreadcrumbsModule } from '@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '@vex/components/page-layout/page-layout.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ComplexTableModule } from '@shared/components/complex-table/complex-table.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AuthorizedUsersComponent,
    ListOfAuthorizedUsersComponent,
    CreateAuthorizedUsersComponent
  ],
  imports: [
    ComplexTableModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    ManageLicensesRoutingModule,
    MatButtonModule,
    MatTabsModule,
    CommonModule,
    MatProgressSpinnerModule,
    PageLayoutModule
  ]
})
export class ManageLicensesModule { }