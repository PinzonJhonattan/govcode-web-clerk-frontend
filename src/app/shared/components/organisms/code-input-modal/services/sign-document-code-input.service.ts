import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignDocumentCodeInputService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  getVerificationCode() {
    return this.http.get(`${this.apiUrl}/OtpVerification/generate-code-otp`)
  }

  validateCode(verificationCode: string) {
    return this.http.get(`${this.apiUrl}/OtpVerification/validate-code-otp/${verificationCode}`)
  }
}
