import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import {
  FormControl, FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { fadeInUp400ms } from "@vex/animations/fade-in-up.animation";
import { LoginService } from "./services/login.service";
import { statusOperation } from "@shared/models/status.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [fadeInUp400ms]
})
export class LoginComponent implements OnInit {
  status: statusOperation = "init";
  messageError = "";
  inputType = "password";
  visible = false;
  isHuman: boolean = false;
  form = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    // isHuman: new FormControl("" , [Validators.required]),
  });
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private login: LoginService
  ) {}

  ngOnInit() {

  }

  isValidCaptcha(isValid: boolean) {
    this.isHuman = isValid;
  }

  onSubmit() {
    this.status = "loading";

    if (!this.form.valid) {
      console.log("Gov 1")
      this.form.markAllAsTouched();
      this.status = "init";
      return;
    }

    const { username, password } = this.form.getRawValue();
    console.log("Gov")
    this.login.loginByUsername({ username, password }).subscribe({
      next: (data) => {
        this.status = "success";
        // this.form.controls.isHuman.setValue(null);
        // this.form.controls.isHuman.reset()
        this.router.navigate(["/"]);
      },
      error: (err) => {
        // this.form.controls.isHuman.setValue(null);
        // this.form.controls.isHuman.reset()
        this.messageError = err?.error?.message ?? "Usuario o contraseña no validos";
        this.status = "error";
      }
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  protected readonly FormControl = FormControl;
}
