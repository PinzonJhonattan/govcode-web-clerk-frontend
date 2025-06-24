import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {statusOperation} from "@shared/models/status.model";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import Swal from "sweetalert2";
import {RolesClerk} from "@features/manage-users/models/roles.model";

interface DialogLeaveRolesData {
  infoRoles : RolesClerk[]
}

@Component({
  selector: 'app-leave-many-roles-group',
  templateUrl: './leave-many-roles-group.component.html',
  styleUrls: ['./leave-many-roles-group.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  standalone: true
})
export class LeaveManyRolesGroupComponent implements OnInit {

  public statusLeaveGroupRoles: statusOperation = 'init';
  membersLength = 0;

  constructor(
    public dialogRef: MatDialogRef<LeaveManyRolesGroupComponent>,
    @Inject(DIALOG_DATA) public rolesData: DialogLeaveRolesData,
    private manageGroupService : ManageGroupsClerkService,
    private generalGroupInfo : GeneralGroupInfo
  ) {
  }

  ngOnInit(): void {
    this.membersLength = this.rolesData.infoRoles.length
  }

  handleLeaveRolesMembers(){
    this.statusLeaveGroupRoles = 'loading'
    this.manageGroupService.leaveRolesFromGroup(this.generalGroupInfo.getActualGroup().id, this.rolesData.infoRoles).subscribe({
      next: () => {
        this.statusLeaveGroupRoles = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Se han removido los roles del grupo seleccionados</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          removed : true
        });
      },
      error : () => {
        this.statusLeaveGroupRoles = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al remover los roles del grupo, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }
}
