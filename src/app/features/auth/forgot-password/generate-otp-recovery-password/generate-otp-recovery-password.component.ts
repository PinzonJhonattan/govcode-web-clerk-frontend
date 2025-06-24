import {Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {RouterLinkWithHref} from "@angular/router";
import {PasswordRecoveryService} from "@features/auth/forgot-password/services/password-recovery.service";
import {statusOperation} from "@shared/models/status.model";
import {SharedModule} from "@shared/shared.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-generate-otp-recovery-password',
  templateUrl: './generate-otp-recovery-password.component.html',
  styleUrls: ['./generate-otp-recovery-password.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    RouterLinkWithHref,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class GenerateOtpRecoveryPasswordComponent implements OnInit {

  @Input() changeModeRecoveryPassword : (mode: 'generate-code' | 'validate-code')  => void
  @Input() changeActualUsername : (username: string) => void

  status: statusOperation = 'init';
  messageError = '';

  recoveryPasswordForm = this.fb.group({
    username: [null, Validators.required]
  });

  constructor(
    private recoveryPasswordService: PasswordRecoveryService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
  }

  generateRecoveryPasswordToken() {
    if (this.recoveryPasswordForm.invalid) {
      this.recoveryPasswordForm.markAllAsTouched()
      return;
    }
    this.status = 'loading';
    this.recoveryPasswordService.generateRecoveryPasswordToken(this.recoveryPasswordForm.controls.username.value).subscribe({
      next: () => {
        this.status = 'success';
        this.changeModeRecoveryPassword('validate-code')
        this.changeActualUsername(this.recoveryPasswordForm.controls.username.value)
      },
      error: (error) => {
        this.status = 'error';
        this.messageError = error.error?.message || 'Ha ocurrido un error al recuperar la contraseña, intente de nuevo'
      }
    })
  }

}
