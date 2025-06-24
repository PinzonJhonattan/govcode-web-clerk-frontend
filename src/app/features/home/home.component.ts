import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "@core/services/user.service";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router : Router, public userService : UserService) { }

  canViewTasks:boolean = false;

  ngOnInit(): void {
    const rolFound = this.userService?.getUser()?.roles.find((role) => role.name === APP_ROLES_PERMISSIONS.APP_VIEW_TASKS);
    if(rolFound){
      this.canViewTasks = true;
    }
  }

  protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
