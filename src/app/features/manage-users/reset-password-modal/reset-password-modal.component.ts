import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mustMatch } from '../utils/passwordsMustMatch';
import { LoginService } from '@features/auth/login/services/login.service';
import Swal from 'sweetalert2';
import {customPatternValidator} from "@shared/validators/customPattern.validator";
import {statesProcess} from "@shared/models/statesRequest.model";

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent implements OnInit {

  resetPasswordForm: FormGroup;
  userId: string;

  statusResetProcess : statesProcess = 'init';

  inputTypePassword = "password"
  inputTypeRepeatPassword = "password"

  visiblePassword = false;
  visibleRepeatPassword = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public dialogRef: MatDialogRef<ResetPasswordModalComponent>,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required,
        customPatternValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/, 'La contraseña no cumple con el formato especificado (Mínimo ocho (8) caracteres, un número, una letra minúscula, una letra mayúscula)') ,

  ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.userId = this.data.infoUser.id;
  }

  onSubmit() {
    if(this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.statusResetProcess = 'loading'

    const changePassword = {
      userId: this.userId,
      newPassword: this.resetPasswordForm.value.password
    }

    this.loginService.changePassword(changePassword).subscribe({
        next: (response) => {
          this.statusResetProcess = 'success'
          this.dialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada',
            text: 'La contraseña ha sido actualizada correctamente',
            confirmButtonText: 'Aceptar',
            timer: 2000
          });
        },
        error: (error) => {
          this.statusResetProcess = 'error'
          Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Ha ocurrido un error al intentar actualizar la contraseña',
            confirmButtonText: 'Aceptar',
          });
        },
      });
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


}
