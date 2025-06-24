import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  GenerateOtpRecoveryPasswordComponent
} from "@features/auth/forgot-password/generate-otp-recovery-password/generate-otp-recovery-password.component";
import {
  ValidateOtpRecoveryPasswordComponent
} from "@features/auth/forgot-password/validate-otp-recovery-password/validate-otp-recovery-password.component";

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,

    MatIconModule,
    GenerateOtpRecoveryPasswordComponent,
    ValidateOtpRecoveryPasswordComponent
  ]
})
export class ForgotPasswordModule {
}
