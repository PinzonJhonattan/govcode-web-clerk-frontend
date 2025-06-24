import { Injectable } from "@angular/core";
import { CanActivate, Router} from "@angular/router";
import {UserService} from "@core/services/user.service";
import {getUserRole} from "@shared/utils/getUserRole";
import {ACTOR_ROLES_PERMISSIONS} from "@core/constants/permissions";

@Injectable({
  providedIn: "root",
})
export class RedirectGuard implements CanActivate {
  constructor(private userService : UserService, private router: Router) {}

  canActivate(

  ): boolean {
    const [roleUser] = getUserRole(this.userService.getUser().roles)
    if (roleUser == ACTOR_ROLES_PERMISSIONS.ACTOR_ADMIN) {
      this.router.navigate(["/asignar-usuarios"]);
    }
    return true
  }
}
