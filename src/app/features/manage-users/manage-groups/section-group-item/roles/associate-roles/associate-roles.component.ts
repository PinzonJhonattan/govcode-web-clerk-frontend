import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {SharedModule} from "@shared/shared.module";
import {User} from "@features/manage-users/models/users.model";
import {ManageUsersService} from "@features/manage-users/services/manage-users.service";
import {
  columnsAssociateRolesToGroup
} from "@features/manage-users/manage-groups/constants/columns-roles-to-associate-group";
import {ManageRolesClerkService} from "@features/manage-users/services/roles.service";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import Swal from "sweetalert2";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-associate-roles',
  templateUrl: './associate-roles.component.html',
  styleUrls: ['./associate-roles.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    SharedModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  standalone: true
})
export class AssociateRolesComponent implements OnInit {

  public messageErrorAssociateRolesGroupClerk : string = '';
  columnsAssociateRolesToGroup : any[] = columnsAssociateRolesToGroup
  dataTableAssociateRolesToGroup: any[] = [];
  stateLoadAssociateRolesToGroup: string = 'init';
  stateAssociateRolesToGroup: string = 'init';
  rolesSelected : User[] = [];
  infoGroup : GroupItem;


  constructor(
    public dialogRef: MatDialogRef<AssociateRolesComponent>,
    private manageGroupService : ManageGroupsClerkService,
    private generalGroupInfo : GeneralGroupInfo,
  ) {
    this.infoGroup = this.generalGroupInfo.getActualGroup()
  }

  ngOnInit(): void {
    this.getRealmUsers()
  }

  getRealmUsers(){
    this.stateLoadAssociateRolesToGroup = 'loading'
    this.manageGroupService.getRolesNotInGroup(this.infoGroup.id).subscribe({
      next : (roles) => {
        this.dataTableAssociateRolesToGroup = roles;
        this.stateLoadAssociateRolesToGroup = 'success'
      },
      error : () => {
        this.stateLoadAssociateRolesToGroup = 'error'

      }
    })
  }

  handleAssociateRolesGroup(){
    this.stateAssociateRolesToGroup = 'loading'
    this.manageGroupService.associateRolesToGroup(this.infoGroup.id, this.rolesSelected).subscribe({
      next : (users) => {
        this.stateAssociateRolesToGroup = 'success'
        this.dialogRef.close({
          associated : true
        })
        Swal.fire({
          position: "bottom-end",
          html: `<p>Rol${this.rolesSelected.length == 1 ? '' : 'es'} asociado${this.rolesSelected.length == 1 ? '' : 's'} exitosamente</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      },
      error : () => {
        this.stateAssociateRolesToGroup = 'error'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Ha ocurrido un error al asociar los roles</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

  changeRolesSelected(selectedRolesRow : any[]){
    this.rolesSelected = selectedRolesRow;
  }

}
