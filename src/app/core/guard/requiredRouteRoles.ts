import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {UserService} from "@core/services/user.service";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

interface RequiredRouteRolesInterface {
  roles: APP_ROLES_PERMISSIONS[]
  strategy : 'all' | 'some'
}


function requiredRouteRoles({roles = [], strategy = 'all'} : RequiredRouteRolesInterface) : CanActivateFn {
  return (ars : ActivatedRouteSnapshot, rss : RouterStateSnapshot) => {
    const router = inject(Router);
    const userService = inject(UserService)
    const userRoles = userService.getUser()?.roles?.map(role => role.name) ?? [];

    let hasPermission = false;

    if(strategy === 'all') {
      hasPermission = roles.every(role => userRoles.includes(role));
    } else if (strategy === 'some') {
      hasPermission = roles.some(role => userRoles.includes(role));
    }

    if(!hasPermission){
      router.navigate(["/login"]);
    }
    return hasPermission;
  }
}

export default requiredRouteRoles;
