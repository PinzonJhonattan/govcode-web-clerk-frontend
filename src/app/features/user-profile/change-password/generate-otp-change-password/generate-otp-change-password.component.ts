import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserPasswordChangeService} from "@features/user-profile/change-password/services/user-password-change.service";
import {statusOperation} from "@shared/models/status.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ComponentsModule} from "@shared/components/components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {RouterLinkWithHref} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-generate-otp-change-password',
  templateUrl: './generate-otp-change-password.component.html',
  standalone: true,
  imports: [
    ComponentsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgIf,
    ReactiveFormsModule,
    RouterLinkWithHref,
    MatTooltipModule
  ],
  styleUrls: ['./generate-otp-change-password.component.scss']
})
export class GenerateOtpChangePasswordComponent implements OnInit {

  @Input() changeModeChangePassword : (mode: 'generate-change-password-code' | 'validate-change-password-code')  => void

  inputTypePassword = "password"

  visiblePassword = false;

  status: statusOperation = 'init';
  messageError = '';

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private cd: ChangeDetectorRef,
    private changePasswordService : UserPasswordChangeService
  ) {}

  ngOnInit(): void {}

  generateChangePasswordToken() {
    if(this.changePasswordForm.invalid){
      this.changePasswordForm.markAllAsTouched()
      return;
    }
    this.status = 'loading';
    this.changePasswordService.generateChangePasswordToken({
      oldPassword : this.changePasswordForm.controls.oldPassword.value
    }).subscribe({
      next : () => {
        this.status = 'success';
        this.changeModeChangePassword('validate-change-password-code')
      },
      error : (error) => {
        this.status = 'error';
        this.messageError = error.error?.message || 'Ha ocurrido un error al cambiar la contraseña, intente de nuevo'
      }
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
}
