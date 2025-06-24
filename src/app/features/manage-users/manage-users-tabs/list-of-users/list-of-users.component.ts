import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { columnsManageUsers } from '@features/manage-users/constants/columns-manage-users';
import { ResetPasswordModalComponent } from '@features/manage-users/reset-password-modal/reset-password-modal.component';
import { ManageUsersService } from '@features/manage-users/services/manage-users.service';
import {DeleteUserComponent} from "@features/manage-users/manage-users-tabs/delete-user/delete-user.component";
import {DeleteRoleComponent} from "@features/manage-users/manage-roles/delete-role/delete-role.component";
import {
  DeactivateMemberComponent
} from "@features/manage-users/manage-users-tabs/deactivate-member/deactivate-member.component";
import {
  ViewUserRolesComponent
} from "@features/manage-users/manage-users-tabs/view-user-roles/view-user-roles.component";

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.getUsersData();
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnsManageUsers;
  dataTableUsers: any[] = [];
  state: string = 'idle';

  constructor(
    private manageUsersService: ManageUsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.state = 'loading';
    this.manageUsersService.getUsers().subscribe({
      next: (response) => {
        this.state = 'success';
        response = response.map((user) => {
          return {
            ...user,
            linkButtonEdit: `edit/${user.id}`
          };
        });
        this.dataTableUsers = response;
      },
      error: (error) => {
        this.state = 'error';
        console.error(error);
      }
    })
  }

  handleEnabledStateMemberModal(infoMember){
    const dialogRef = this.dialog.open(DeactivateMemberComponent, {
      width : "auto",
      data: {
        infoMember
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.updated){
        this.getUsersData()
      }
    });
  }

  handleViewRolesUser(infoUser){
    const dialogRef = this.dialog.open(ViewUserRolesComponent, {
      width : "auto",
      data: {
        infoUser
      },
    });
  }

  resetPassword(infoUser) {
    const resetPasswordModal = this.dialog.open(ResetPasswordModalComponent, {
      width : "600px",
      maxWidth : "100%",
      data : {
        infoUser
      }
    });
  }

  removeUser(infoUser){
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width : "500px",
      data: {
        infoUser
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.deleted){
        this.getUsersData();
      }
    });
  }
}
