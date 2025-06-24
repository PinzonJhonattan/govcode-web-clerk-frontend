import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {statusOperation} from "@shared/models/status.model";
import {Router} from "@angular/router";
import {RegisterUserForm} from "@features/auth/register/models/register.model";
import {matchPasswordsValidator} from "@shared/validators/matchPassword.validator";
import {RegisterService} from "@features/auth/register/services/register.service";
import Swal from "sweetalert2";
import {customPatternValidator} from "@shared/validators/customPattern.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup<RegisterUserForm>;
  status: statusOperation = "init";
  messageError = "";
  inputTypePassword = "password"
  inputTypeRepeatPassword = "password"
  isHuman: boolean = false;

  visiblePassword = false;
  visibleRepeatPassword = false;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private register: RegisterService
  ) {}

  ngOnInit() {
    this.form = new FormGroup<RegisterUserForm>({
      username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(40), customPatternValidator(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9.]+$/, 'El nombre de usuario debe contener minimo una letra. Puede tener puntos y números, sin espacios')] }),
      firstName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      lastName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required,
          customPatternValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/, 'La contraseña no cumple con el formato especificado (Mínimo ocho (8) caracteres, un número, una letra minúscula, una letra mayúscula)')] }),
      passwordRepeat: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      isHuman: new FormControl(null , [Validators.required]),
    }, {validators: [matchPasswordsValidator('password', 'passwordRepeat')]});
  }

  isValidCaptcha(isValid: boolean) {
    this.isHuman = isValid;
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.status = "init";
      return;
    }

    this.status = "loading";

    const { username, password, firstName, lastName, email } = this.form.getRawValue();

    this.register.simpleRegister({ username, password, firstName,lastName,email }).subscribe({
      next: () => {
        this.status = "success";
        this.form.controls.isHuman.setValue(null);
        this.form.controls.isHuman.reset()
        Swal.fire({
          title: `Se ha creado la cuenta exitosamente`,
          html: `Su cuenta ha sido creada, Se ha enviado un enlace para validación de su cuenta al correo electrónico para poder ingresar al portal. A continuación se redirigirá al inicio de sesión`,
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(["/"]);
        })
      },
      error: (error) => {
        this.form.controls.isHuman.setValue(null);
        this.form.controls.isHuman.reset()
        if(error.error.error === 'Username already exists.'){
          this.status = 'error';
          this.messageError = 'El nombre de usuario no es valido para registrar';
          return;
        }

        if(error.error.error === 'Email already exists.'){
          this.status = 'error';
          this.messageError = 'El correo no es valido para registrar';
          return;
        }

        this.messageError = error?.error?.error ?? "Usuario o contraseña no validos";
        this.status = "error";
      }
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
