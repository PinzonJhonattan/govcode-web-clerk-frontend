import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {InfoRecoveryPasswordValidation} from "@features/auth/forgot-password/models/validationRecoveryPassword";

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  apiUrl = environment.apiUrl
  model = 'Authentication'

  constructor(private httpClient : HttpClient) { }

  generateRecoveryPasswordToken(username: string) {
    return this.httpClient.get(`${this.apiUrl}/${this.model}/request-recovery-password/${username}`)
  }

  validateRecoveryPasswordToken(infoRecoveryPasswordValidation : InfoRecoveryPasswordValidation) {
    return this.httpClient.post(`${this.apiUrl}/${this.model}/validate-recovery-password`, infoRecoveryPasswordValidation)

  }
}
