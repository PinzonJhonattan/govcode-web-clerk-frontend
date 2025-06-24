import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {statusOperation} from "@shared/models/status.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {matchPasswordsValidator} from "@shared/validators/matchPassword.validator";
import {UserPasswordChangeService} from "@features/user-profile/change-password/services/user-password-change.service";
import {InfoChangePasswordValidation} from "@features/user-profile/change-password/models/validationChangePassword";
import {CodeInputModule} from "angular-code-input";
import {ComponentsModule} from "@shared/components/components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {Router, RouterLinkWithHref} from "@angular/router";
import {ChangePasswordComponent} from "@features/user-profile/change-password/change-password.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ChangePasswordAlertComponent
} from "@features/user-profile/change-password/change-password-alert/change-password-alert.component";
import {customPatternValidator} from "@shared/validators/customPattern.validator";

@Component({
  selector: 'app-validate-otp-change-password',
  templateUrl: './validate-otp-change-password.component.html',
  standalone: true,
  imports: [
    CodeInputModule,
    ComponentsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    NgIf,
    ReactiveFormsModule,
    RouterLinkWithHref
  ],
  styleUrls: ['./validate-otp-change-password.component.scss']
})
export class ValidateOtpChangePasswordComponent implements OnInit {

  @Input() changeModeChangePassword: (mode: 'generate-change-password-code' | 'validate-change-password-code') => void
  @Input() closeChangePasswordDialog: () => void;

  inputTypePassword = "password"
  inputTypeRepeatPassword = "password"

  visiblePassword = false;
  visibleRepeatPassword = false;

  status: statusOperation = 'init';
  messageError = '';

  validateOTPChangePasswordForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, customPatternValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/, 'La contraseña no cumple con el formato especificado (Mínimo ocho (8) caracteres, un número, una letra minúscula, una letra mayúscula)'),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {validators: [matchPasswordsValidator('password', 'confirmPassword')]});

  constructor(
    private cd: ChangeDetectorRef,
    private changePasswordService: UserPasswordChangeService,
    private dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  codeHasChanged(otpCode: string) {
    this.validateOTPChangePasswordForm.patchValue({
      otp: otpCode
    })
  }

  toggleVisibilityPassword() {
    if (this.visiblePassword) {
      this.inputTypePassword = "password";
      this.visiblePassword = false;
      this.cd.markForCheck();
    } else {
      this.inputTypePassword = "text";
      this.visiblePassword = true;
      this.cd.markForCheck();
    }
  }

  toggleVisibilityRepeatPassword() {
    if (this.visibleRepeatPassword) {
      this.inputTypeRepeatPassword = "password";
      this.visibleRepeatPassword = false;
      this.cd.markForCheck();
    } else {
      this.inputTypeRepeatPassword = "text";
      this.visibleRepeatPassword = true;
      this.cd.markForCheck();
    }
  }

  validateRecoveryPasswordToken() {
    if (this.validateOTPChangePasswordForm.invalid) {
      this.validateOTPChangePasswordForm.markAllAsTouched()
      return;
    }

    this.status = 'loading'

    const validationOtpData: InfoChangePasswordValidation = {
      codeOtp: Number(this.validateOTPChangePasswordForm.controls.otp.value),
      newPassword: this.validateOTPChangePasswordForm.controls.password.value,
    }

    this.changePasswordService.validateChangePasswordToken(validationOtpData).subscribe({
      next: () => {
        this.status = 'success'
        this.openValidationOtpSuccessModal();
      },
      error: (error) => {
        this.status = 'error';
        this.messageError = error.error?.message || 'Ha ocurrido un error al cambiar la contraseña, intente de nuevo'
      }
    })
  }

  openValidationOtpSuccessModal() {
    const validationSuccessAlertDialog = this.dialog.open(ChangePasswordAlertComponent, {
      width: "100%",
      maxWidth: "600px"
    });
    validationSuccessAlertDialog.afterClosed().subscribe(() => {
      this.router.navigate(['/'])
    });
  }
}
