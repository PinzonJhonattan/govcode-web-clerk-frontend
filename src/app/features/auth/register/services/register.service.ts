import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {RegisterModelDTO} from "@features/auth/register/models/register.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  simpleRegister(userRegisterData : RegisterModelDTO){
    return this.http.post(`${this.apiUrl}/Authentication/register`, userRegisterData)
  }
}
