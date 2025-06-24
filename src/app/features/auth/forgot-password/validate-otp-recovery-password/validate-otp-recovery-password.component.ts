import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {Router, RouterLinkWithHref} from "@angular/router";
import {CodeInputModule} from "angular-code-input";
import {matchPasswordsValidator} from "@shared/validators/matchPassword.validator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ComponentsModule} from "@shared/components/components.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {statusOperation} from "@shared/models/status.model";
import {InfoRecoveryPasswordValidation} from "@features/auth/forgot-password/models/validationRecoveryPassword";
import {PasswordRecoveryService} from "@features/auth/forgot-password/services/password-recovery.service";
import {
  RecoveryPasswordAlertComponent
} from "@features/auth/forgot-password/recovery-password-alert/recovery-password-alert.component";
import {MatDialog} from "@angular/material/dialog";
import {customPatternValidator} from "@shared/validators/customPattern.validator";

@Component({
  selector: 'app-validate-otp-recovery-password',
  templateUrl: './validate-otp-recovery-password.component.html',
  styleUrls: ['./validate-otp-recovery-password.component.scss'],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    RouterLinkWithHref,
    CodeInputModule,
    MatTooltipModule,
    ComponentsModule,
    MatProgressSpinnerModule
  ],
  standalone: true
})
export class ValidateOtpRecoveryPasswordComponent implements OnInit {

  @Input() changeModeRecoveryPassword: (mode: 'generate-code' | 'validate-code') => void
  @Input() actualUsername: string = ''

  inputTypePassword = "password"
  inputTypeRepeatPassword = "password"

  visiblePassword = false;
  visibleRepeatPassword = false;

  status: statusOperation = 'init';
  messageError = '';


  validateOTPPasswordForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,
      customPatternValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/, 'La contraseña no cumple con el formato especificado (Mínimo ocho (8) caracteres, un número, una letra minúscula, una letra mayúscula)'),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {validators: [matchPasswordsValidator('password', 'confirmPassword')]});

  constructor(private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              private router: Router,
              private recoveryPasswordService: PasswordRecoveryService,
  ) {
  }

  ngOnInit(): void {
    this.validateOTPPasswordForm.patchValue({
      username: this.actualUsername
    })
  }

  codeHasChanged(otpCode: string) {
    this.validateOTPPasswordForm.patchValue({
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

  validateOtpRecoveryPassword() {
    if (this.validateOTPPasswordForm.invalid) {
      this.validateOTPPasswordForm.markAllAsTouched()
      return;
    }

    this.status = 'loading'

    const validationOtpData: InfoRecoveryPasswordValidation = {
      username: this.validateOTPPasswordForm.controls.username.value,
      codeOtp: Number(this.validateOTPPasswordForm.controls.otp.value),
      newPassword: this.validateOTPPasswordForm.controls.password.value,
    }

    this.recoveryPasswordService.validateRecoveryPasswordToken(validationOtpData).subscribe({
      next: () => {
        this.status = 'success'
        this.openValidationAlert();
      },
      error: (error) => {
        this.status = 'error';
        this.messageError = error.error?.message || 'Ha ocurrido un error al recuperar la contraseña, intente de nuevo'
      }
    })
  }

  openValidationAlert() {
    const validationSuccessAlertDialog = this.dialog.open(RecoveryPasswordAlertComponent, {
      width: '30%',
    });
    validationSuccessAlertDialog.afterClosed().subscribe(() => {
      this.router.navigate(['/login'])
    });
  }

}
