import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import {UserService} from "@core/services/user.service";
import {ACTOR_ROLES_PERMISSIONS} from "@core/constants/permissions";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private userService : UserService, private router: Router) {}

  /**
   * Verify if token exist, to allow access to page, if not redirect to Login
   * @returns {boolean} Result of token verification
   */
  canActivate(): boolean {
    const currentRole = this.userService.getCurrentRole()?.name;

    if (currentRole !== ACTOR_ROLES_PERMISSIONS.ACTOR_ADMIN) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
