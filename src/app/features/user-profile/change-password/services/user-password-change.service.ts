import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  InfoChangePasswordValidation,
  InfoRequestChangePasswordValidation
} from "@features/user-profile/change-password/models/validationChangePassword";

@Injectable({
  providedIn: 'root'
})
export class UserPasswordChangeService {
  apiUrl = environment.apiUrl
  model = 'Authentication'

  constructor(private httpClient : HttpClient) { }

  generateChangePasswordToken(infoRequestChangePasswordValidation : InfoRequestChangePasswordValidation) {
    return this.httpClient.post(`${this.apiUrl}/${this.model}/request-change-password`, infoRequestChangePasswordValidation)
  }

  validateChangePasswordToken(infoChangePasswordValidation : InfoChangePasswordValidation) {
    return this.httpClient.post(`${this.apiUrl}/${this.model}/validate-change-password`, infoChangePasswordValidation)

  }
}
