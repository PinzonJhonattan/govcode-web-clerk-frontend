import {Component, Inject, OnInit} from '@angular/core';
import {columnsManageUsers} from "@features/manage-users/constants/columns-manage-users";
import {columnsViewRoles} from "@features/manage-users/manage-users-tabs/constants/columns-view-roles";
import {statesProcess} from "@shared/models/statesRequest.model";
import {ManageUsersService} from "@features/manage-users/services/manage-users.service";
import {MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";

interface DialogUserRolesClerkData {
  infoUser : any
}

@Component({
  selector: 'app-view-user-roles',
  templateUrl: './view-user-roles.component.html',
  styleUrls: ['./view-user-roles.component.scss']
})
export class ViewUserRolesComponent implements OnInit {

  columnsRoles: any[] = columnsViewRoles;
  dataTableRoles: any[] = [];
  stateLoadRoles: statesProcess = 'init';

  constructor(private manageUsersService : ManageUsersService,  public dialogRef: MatDialogRef<ViewUserRolesComponent>,
              @Inject(DIALOG_DATA) public userData: DialogUserRolesClerkData,) { }

  ngOnInit(): void {
    this.getUserRoles();
  }

  getUserRoles() {
    this.stateLoadRoles = 'loading';
    this.manageUsersService.getUserById(this.userData.infoUser.id).subscribe({
      next: (response) => {
        this.stateLoadRoles = 'success';
        this.dataTableRoles = response.roles;
      },
      error: (error) => {
        this.stateLoadRoles = 'error';
        console.error(error);
      }
    })
  }

  protected readonly columns = columnsManageUsers;
}
