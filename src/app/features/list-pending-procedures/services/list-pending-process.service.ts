import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "@core/services/user.service";
import { environment } from "@environments/environment";
import { getUserRole } from "@shared/utils/getUserRole";

@Injectable({
  providedIn: "root",
})
export class ListPendingProcessService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) {}
  /**
   * Get tasks by user role assignee
   * @returns { Observable } - data response of request
   */
  getList() {
    const user = this.userService.getUser();
    const currentRole = this.userService.getCurrentRole();

    // api/Task/TasksAssigneeRoleByUsername/role/role
    // TODO : Pedir el username en el user de la petición
    return this.http.get(`${this.getUrl()}/Task/TasksAssigneeRoleByUsername/${currentRole?.name}/${user?.username}`);
  }

  getUrl() {
    return `${this.apiUrl}`;
  }
}
