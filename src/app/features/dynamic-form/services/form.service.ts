import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formResetSubject = new Subject<void>()
  private formSubmitSubject = new Subject<void>();
  private dynamicForm: FormGroup;

  formSubmit$  = this.formSubmitSubject.asObservable();
  formReset$ = this.formResetSubject.asObservable();
  constructor() {}

  triggerFormSubmit(){
    this.formSubmitSubject.next();
  }
  triggerFormReset() {
    this.formResetSubject.next();
  }

  setDynamicForm(form : FormGroup){
    this.dynamicForm = form;
  }

  getDynamicForm(){
    return this.dynamicForm;
  }
}
