import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  apiUrl: string = environment.apiUrl;
  model : string = 'identity'
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get(`${this.getUrl()}/clerk/roles`);
  }
  getUsers() {
    return this.http.get(`${this.getUrl()}/clerk/users`);
  }

  getUsersByRole(role : string) {
    // return this.http.get(`${this.getUrl()}/usersByRol/${role}`);
    return this.http.get(`${this.apiUrl}/clerk/users/get-users-by-role/${role}`);
  }
  getUrl() {
    return `${this.apiUrl}/${this.model}`;
  }
}
