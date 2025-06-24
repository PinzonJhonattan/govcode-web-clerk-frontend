import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCitizensTabsComponent } from './manage-citizens-tabs/manage-citizens-tabs.component';
import { ListOfCitizensComponent } from './manage-citizens-tabs/list-of-citizens/list-of-citizens.component';
import { CitizensFormComponent } from './manage-citizens-tabs/citizens-form/citizens-form.component';
import { BreadcrumbsModule } from '@vex/components/breadcrumbs/breadcrumbs.module';
import { ComplexTableModule } from '@shared/components/complex-table/complex-table.module';
import { ManageCitizensRoutingModule } from './manage-citizens-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutModule } from '@vex/components/page-layout/page-layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
import {ManageRolesComponent} from "@features/manage-citizens/manage-roles/manage-roles.component";
import {ListOfRolesComponent} from "@features/manage-citizens/manage-roles/list-of-roles/list-of-roles.component";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "@shared/shared.module";

@NgModule({
    declarations: [ManageCitizensTabsComponent,ListOfRolesComponent, ListOfCitizensComponent, CitizensFormComponent, ManageRolesComponent , ResetPasswordModalComponent],
    imports: [
        BreadcrumbsModule,
        CommonModule,
        ComplexTableModule,
        ManageCitizensRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        PageLayoutModule,
        ReactiveFormsModule,
        MatIconModule,
        SharedModule,
    ],
})
export class ManageCitizensModule {}
