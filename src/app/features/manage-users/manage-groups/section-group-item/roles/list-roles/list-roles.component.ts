import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "@shared/shared.module";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {MatDialog} from "@angular/material/dialog";
import {
  AssociateRolesComponent
} from "@features/manage-users/manage-groups/section-group-item/roles/associate-roles/associate-roles.component";
import {columnsRolesGroup} from "@features/manage-users/manage-groups/constants/columns-roles-group";
import {
  LeaveGroupRol
} from "@features/manage-users/manage-groups/section-group-item/roles/leave-group-rol/leave-group-rol.component";
import {User} from "@features/manage-users/models/users.model";
import {
  LeaveManyRolesGroupComponent
} from "@features/manage-users/manage-groups/section-group-item/roles/leave-many-roles-group/leave-many-roles-group.component";

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  standalone: true
})
export class ListRolesComponent implements OnInit {

  groupInfo : GroupItem;
  columnsRolesGroup : any[] = columnsRolesGroup
  dataTableRolesGroup: any[] = [];
  stateLoadRolesGroup: string = 'success';
  rolesSelected : User[] = [];

  constructor(private manageGroupsClerkService : ManageGroupsClerkService, private generalGroupInfo : GeneralGroupInfo,     public dialog: MatDialog
  ) {
    this.groupInfo = this.generalGroupInfo.getActualGroup();
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(){
    this.stateLoadRolesGroup = 'loading'
    this.manageGroupsClerkService.getRoles(this.groupInfo.id).subscribe({
      next : (data) => {
        this.stateLoadRolesGroup = 'success'
        this.dataTableRolesGroup = data;
      },
      error : () => {
        this.stateLoadRolesGroup = 'error'
      }
    })
  }
  handleAssociateRolesToGroupModal(){
    const dialogRef = this.dialog.open(AssociateRolesComponent, {
      width : "auto",
      data: {
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.associated){
        this.loadRoles();
      }
    });
  }

  handleRemoveRolesFromGroupModal(){
    const dialogRef = this.dialog.open(LeaveManyRolesGroupComponent, {
      width : "auto",
      data: {
        infoRoles : this.rolesSelected
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.removed){
        this.loadRoles();
      }
    });
  }

  handleRemoveRolFromGroupModal(infoRol){
    const dialogRef = this.dialog.open(LeaveGroupRol, {
      width : "auto",
      data: {
        infoRol
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.removed){
        this.loadRoles();
      }
    });
  }

  changeRolesSelected(selectedRolesRow : any[]){
    this.rolesSelected = selectedRolesRow;
  }

}
