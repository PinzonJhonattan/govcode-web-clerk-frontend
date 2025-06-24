import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {
  private formResetSubject = new Subject<void>();

  formReset$ = this.formResetSubject.asObservable();

  constructor() {}

  triggerFormReset() {
    this.formResetSubject.next();
  }
}
