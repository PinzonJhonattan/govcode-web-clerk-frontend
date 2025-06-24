import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mustMatch } from '@features/manage-users/utils/passwordsMustMatch';
import Swal from 'sweetalert2';
import { ManageCitizensService } from '../services/manage-citizens.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent implements OnInit {

  resetPasswordForm: FormGroup;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private manageCitizensService: ManageCitizensService,
    public dialogRef: MatDialogRef<ResetPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
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

    const changePassword = {
      userId: this.userId,
      newPassword: this.resetPasswordForm.value.password
    }

    this.manageCitizensService.changePassword(changePassword).subscribe({
        next: (response) => {
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
          Swal.fire({
            icon: 'error',
            title: `${error.title}`,
            text: 'Ha ocurrido un error al intentar actualizar la contraseña',
            confirmButtonText: 'Aceptar',
          });
        },
      });
  }

}
