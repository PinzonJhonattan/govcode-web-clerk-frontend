import { Injectable } from "@angular/core";
import { User } from "@core/models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  setUser(infoUser: User) {
    localStorage.setItem("user", JSON.stringify(infoUser));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getUsersRoles() {
    return this.http.get<any>(this.getUrl() + "/Roles/procedure-roles");
  }

  setCurrentRole(role: string) {
    localStorage.setItem("currentRole", JSON.stringify(role));
  }

  getCurrentRole() : any {
    return JSON.parse(localStorage.getItem("currentRole"));
  }

  setRoles(roles: any) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  getRoles() {
    return JSON.parse(localStorage.getItem("roles"));
  }

  removeUser() {
    localStorage.removeItem("user");
  }

  removeCurrentRole() {
    localStorage.removeItem("currentRole");
  }

  getUrl() {
    return `${this.apiUrl}`;
  }
}
