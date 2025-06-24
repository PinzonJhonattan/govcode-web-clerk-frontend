import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RegisterRoutingModule } from "./register-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SharedModule } from "@shared/shared.module";
import {RegisterComponent} from "@features/auth/register/register.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RecaptchaComponent} from "@shared/components/atoms/recaptcha/recaptcha.component";

@NgModule({
  declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        SharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        RecaptchaComponent
    ]
})
export class RegisterModule {}
