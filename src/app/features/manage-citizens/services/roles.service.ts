import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import {CreateRoleClerkDTO, EditRoleClerkDTO, RolesClerk} from "@features/manage-users/models/roles.model";

@Injectable({
    providedIn: 'root'
})
export class ManageRolesCitizenService {
  apiUrl: string = environment.apiUrl

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get roles actor
   * @returns { Observable } - data response of request
   */
  getActorRoles(): Observable<any> {
    return this.http.get<RolesClerk>(`${this.getUrl()}/roles/actor-roles`);
  }

  /**
   * Get system roles
   * @returns { Observable } - data response of request
   */
  getApplicationRoles(): Observable<any> {
    return this.http.get<RolesClerk>(`${this.getUrl()}/roles/application-roles`);
  }
  /**
   * Get all roles
   * @returns { Observable } - data response of request
   */
  getRoles(): Observable<any> {
    return this.http.get<RolesClerk>(`${this.getUrl()}/user/roles`);
  }
  /**
   * Get roles actor by id
   * @returns { Observable } - data response of request
   */
  getRoleById(roleId): Observable<any> {
    return this.http.get<RolesClerk>(`${this.getUrl()}/roles/role-by-id/${roleId}`);
  }
  /**
   * Create new role in citizen realm
   * @returns { Observable } - data response of request
   */
  createRole(roleInfo : CreateRoleClerkDTO): Observable<any> {
    return this.http.post(`${this.getUrl()}/roles/create-role`, roleInfo);
  }
  /**
   * Edit a role by id in citizen realm
   * @returns { Observable } - data response of request
   */
  editRole(roleId : string, roleInfo : EditRoleClerkDTO): Observable<any> {
    return this.http.put(`${this.getUrl()}/roles/update-role/${roleId}`, roleInfo);
  }

  /**
   * Delete a role by id in citizen realm
   * @returns { Observable } - data response of request
   */
  deleteRole(roleId): Observable<any> {
    return this.http.delete(`${this.getUrl()}/roles/delete-role/${roleId}`);
  }

  getUrl() {
    return `${this.apiUrl}/user`;
  }
}
