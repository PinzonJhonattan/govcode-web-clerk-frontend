import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {RolesClerk} from "@features/manage-users/models/roles.model";
import {User} from "@features/manage-users/models/users.model";

@Injectable({
  providedIn: 'root'
})
export class ManageGroupsClerkService {
  apiUrl: string = environment.apiUrl

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get initial parent groups
   * @returns { Observable } - data response of request
   */
  getRootGroups(): Observable<GroupItem[]> {
    return this.http.get<GroupItem[]>(`${this.getUrl()}`);
  }

  getGroupById(idGroup): Observable<GroupItem> {
    return this.http.get<GroupItem>(`${this.getUrl()}/${idGroup}`);
  }
  /**
   * Get children groups of specific group
   * @returns { Observable } - data response of request
   */
  getChildrenGroups(groupId : string): Observable<GroupItem[]> {
    return this.http.get<GroupItem[]>(`${this.getUrl()}/subgroups/${groupId}`);
  }
  /**
   * Add children group to specific group
   * @returns { Observable } - data response of request
   */
  createSubgroup(dataGroup, parentGroupId): Observable<any> {
    return this.http.post(`${this.getUrl()}/subgroups/${parentGroupId}`, dataGroup);
  }
  /**
   * move specific group to parent or root group
   * @returns { Observable } - data response of request
   */
  moveGroup(dataChildrenGroup, parentGroupId): Observable<any> {
    return this.http.post(`${this.getUrl()}/move${parentGroupId ? `?parent_id=${parentGroupId}` : ''}`, dataChildrenGroup);
  }

  /**
   * Add new specific group
   * @returns { Observable } - data response of request
   */
  createGroup(dataGroup): Observable<any> {
      return this.http.post(`${this.getUrl()}`, dataGroup);
  }
  /**
   * Add new members to specific group
   * @returns { Observable } - data response of request
   */
  associateMembersToGroup(idGroup, membersId): Observable<any> {
    return this.http.post(`${this.getUrl()}/${idGroup}/members`, membersId);
  }
  /**
   * Add new roles to specific group
   * @returns { Observable } - data response of request
   */
  associateRolesToGroup(idGroup, rolesId): Observable<any> {
    return this.http.post(`${this.getUrl()}/${idGroup}/roles`, rolesId);
  }
  /**
   * Edit specific group
   * @returns { Observable } - data response of request
   */
  editGroup(idGroup, dataGroup): Observable<any> {
    return this.http.put(`${this.getUrl()}/${idGroup}`, dataGroup);
  }
  /**
   * Delete specific group
   * @returns { Observable } - data response of request
   */
  deleteGroup(groupId : string) : Observable<any> {
        return this.http.delete(`${this.getUrl()}/${groupId}`);
  }
  /**
   * Get members of specific group
   * @returns { Observable } - data response of request
   */
  getMembers(groupId : string) : Observable<any> {
    return this.http.get(`${this.getUrl()}/${groupId}/members`);
  }
  /**
   * Get users that not are in specific group
   * @returns { Observable } - data response of request
   */
  getUsersNotInGroup(groupId : string) : Observable<any> {
    return this.http.get(`${this.getUrl()}/${groupId}/users/not-in-group`);
  }
  /**
   * Get roles of specific group
   * @returns { Observable } - data response of request
   */
  getRoles(groupId : string) : Observable<any> {
    return this.http.get(`${this.getUrl()}/${groupId}/roles`);
  }

  /**
   * Get roles that not are in specific group
   * @returns { Observable } - data response of request
   */
  getRolesNotInGroup(groupId : string) : Observable<any> {
    return this.http.get(`${this.getUrl()}/${groupId}/roles/not-in-group`);
  }
  /**
   * Remove member from specific group
   * @returns { Observable } - data response of request
   */
  leaveMemberFromGroup(groupId : string, memberId : string ) : Observable<any> {
    return this.http.delete(`${this.getUrl()}/${groupId}/members/${memberId}`);
  }
  /**
   * Remove members from specific group
   * @returns { Observable } - data response of request
   */
  leaveMembersFromGroup(groupId: string, members: User["id"][]) : Observable<any> {
    return this.http.delete(`${this.getUrl()}/${groupId}/members`, {
      body : members
    });
  }
  /**
   * Remove roles (1 or more) from specific group
   * @returns { Observable } - data response of request
   */
  leaveRolesFromGroup(groupId : string, roles : RolesClerk[] ) : Observable<any> {
    return this.http.delete(`${this.getUrl()}/${groupId}/roles`, {
      body : roles
    });
  }
  /**
   * Remove groups (1 or more)
   * @returns { Observable } - data response of request
   */
  removeGroups(groups : GroupItem["id"][] ) : Observable<any> {
    return this.http.delete(`${this.getUrl()}`, {
      body : groups
    });
  }
  getUrl() {
    return `${this.apiUrl}/groups`;
  }
}
