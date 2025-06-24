import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralInfoService {

  public infoForm: Record<string, any>  = {};

  constructor() {}

  updateInfoForm(info : Record<string, any> ){
     this.infoForm = {
       ...this.infoForm,
       ...info
     }
  }
}
