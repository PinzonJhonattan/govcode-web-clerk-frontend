import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import {
  GenerateOtpChangePasswordComponent
} from "@features/user-profile/change-password/generate-otp-change-password/generate-otp-change-password.component";
import {
  ValidateOtpChangePasswordComponent
} from "@features/user-profile/change-password/validate-otp-change-password/validate-otp-change-password.component";
import { ChangePasswordAlertComponent } from './change-password-alert/change-password-alert.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    ChangePasswordComponent,
    ChangePasswordAlertComponent,
  ],
  imports: [
    CommonModule,
    GenerateOtpChangePasswordComponent,
    ValidateOtpChangePasswordComponent,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class ChangePasswordModule { }
