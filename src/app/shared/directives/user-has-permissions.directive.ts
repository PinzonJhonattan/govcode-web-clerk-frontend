import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from "@core/services/user.service";

@Directive({
  selector: '[userHasPermissions]'
})
export class UserHasPermissionsDirective {

  private permissions: string[] = this.userService.getUser().roles.map(role => role.name) || []

  @Input() set userHasPermissions(requiredPermissions: string[]) {
    this.updateView(requiredPermissions);
  }

  @Input() set appPermissions(permissions: string[]) {
    this.permissions = permissions;
    this.updateView();
  }


  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService : UserService
  ) {}

  private updateView(requiredPermissions?: string[]) {
    this.viewContainer.clear();

    if (requiredPermissions && requiredPermissions.every(permission => this.permissions.includes(permission))) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
