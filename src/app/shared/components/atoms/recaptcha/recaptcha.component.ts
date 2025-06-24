import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaComponent as CaptchaComponent
} from "ng-recaptcha";
import {environment} from "@environments/environment";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss'],
  imports: [RecaptchaModule, ReactiveFormsModule, CommonModule, RecaptchaFormsModule],
  standalone: true,
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: "es",
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.siteKeyRecaptcha
      }
    },
  ]
})
export class RecaptchaComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem: CaptchaComponent;

  @Input() fieldControl ?: FormControl;
  @Output() isValidCaptcha = new EventEmitter<boolean>();

  isValid: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    if (!captchaResponse) {
      this.isValidCaptcha.emit(false);
    } else {
      this.isValid = true;
      this.isValidCaptcha.emit(true);
      this.fieldControl?.setValue(true);
    }
  }

  rejected(captchaResponse: any) {
    this.isValidCaptcha.emit(false);
    this.fieldControl?.setValue(false);
  }

  reset() {
    this.isValid = false;
    this.fieldControl.markAsUntouched();
    this.fieldControl.markAsPristine();
    this.isValidCaptcha.emit(false);
    this.captchaElem.reset()
  }

}
