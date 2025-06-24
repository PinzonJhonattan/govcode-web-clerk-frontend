import {Component, OnInit} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {statesProcess} from "@shared/models/statesRequest.model";
import {ManageRolesCitizenService} from "@features/manage-citizens/services/roles.service";
import {columnsManageRolesCitizen} from "@features/manage-citizens/constants/columns-manage-roles-citizen";
import {CreateRoleComponent} from "@features/manage-citizens/manage-roles/create-role/create-role.component";
import {EditRoleComponent} from "@features/manage-citizens/manage-roles/edit-role/edit-role.component";
import {DeleteRoleComponent} from "@features/manage-citizens/manage-roles/delete-role/delete-role.component";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

@Component({
  selector: 'app-list-of-roles-citizen',
  templateUrl: './list-of-roles.component.html',
  styleUrls: ['./list-of-roles.component.scss'],
})
export class ListOfRolesComponent implements OnInit {
  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnsManageRolesCitizen;
  dataTableRoles: any[] = [];
  state: statesProcess = 'init';

  constructor(
    private rolesCitizenService: ManageRolesCitizenService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.getCitizenRoles();
  }

  getCitizenRoles() {
    this.state = 'loading';
    this.rolesCitizenService.getActorRoles().subscribe({
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
          this.getCitizenRoles();
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
        this.getCitizenRoles();
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
        this.getCitizenRoles();
      }
    });
  }

  reloadRoles(){
    this.getCitizenRoles()
  }

  protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
