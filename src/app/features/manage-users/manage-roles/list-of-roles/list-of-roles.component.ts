import {Component, inject, OnInit} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {statesProcess} from "@shared/models/statesRequest.model";
import {ManageRolesClerkService} from "@features/manage-users/services/roles.service";
import {columnsManageRoles} from "@features/manage-users/constants/columns-manage-roles";
import {EditRoleComponent} from "@features/manage-users/manage-roles/edit-role/edit-role.component";
import {DeleteRoleComponent} from "@features/manage-users/manage-roles/delete-role/delete-role.component";
import {CreateRoleComponent} from "@features/manage-users/manage-roles/create-role/create-role.component";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

@Component({
  selector: 'app-list-of-roles',
  templateUrl: './list-of-roles.component.html',
  styleUrls: ['./list-of-roles.component.scss']
})
export class ListOfRolesComponent implements OnInit {
  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnsManageRoles;
  dataTableRoles: any[] = [];
  state: statesProcess = 'init';

  constructor(
    private rolesClerkService: ManageRolesClerkService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.getClerksRoles();
  }

  getClerksRoles() {
    this.state = 'loading';
    this.rolesClerkService.getActorRoles().subscribe({
      next: (response) => {
        this.state = 'success';
        this.dataTableRoles = response;
      },
      error: (error) => {
        this.state = 'error';
        console.error(error);
      }
    })
  }

  createRole(){
      const dialogRef = this.dialog.open(CreateRoleComponent, {
        width : "600px",
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result?.created){
          this.getClerksRoles();
        }
      })
  }

  editRole(infoRole) {
    const dialogRef = this.dialog.open(EditRoleComponent, {
      width : "500px",
      data: {
        infoRole
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.updated){
        this.getClerksRoles();
      }
    });
  }

  deleteRole(infoRole) {

    const dialogRef = this.dialog.open(DeleteRoleComponent, {
      width : "500px",
      data: {
        infoRole
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.deleted){
        this.getClerksRoles();
      }
    });
  }

  reloadRoles(){
    this.getClerksRoles()
  }

  protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
