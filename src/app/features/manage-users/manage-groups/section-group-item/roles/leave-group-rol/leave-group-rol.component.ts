import {Component, Inject, OnInit} from '@angular/core';
import {statusOperation} from "@shared/models/status.model";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import Swal from "sweetalert2";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {RolesClerk} from "@features/manage-users/models/roles.model";

interface DialogLeaveGroupRolData {
  infoRol : RolesClerk
}

@Component({
  selector: 'app-leave-group-rol',
  templateUrl: './leave-group-rol.component.html',
  styleUrls: ['./leave-group-rol.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true
})
export class LeaveGroupRol implements OnInit {

  public statusLeaveGroupRol: statusOperation = 'init';

  constructor(
    public dialogRef: MatDialogRef<LeaveGroupRol>,
    @Inject(DIALOG_DATA) public rolData: DialogLeaveGroupRolData,
    private manageGroupService : ManageGroupsClerkService,
    private generalGroupInfo : GeneralGroupInfo
  ) { }

  ngOnInit(): void {
  }

  handleLeaveGroupRol(){
    this.statusLeaveGroupRol = 'loading'
    this.manageGroupService.leaveRolesFromGroup(this.generalGroupInfo.getActualGroup().id, [{...this.rolData.infoRol}]).subscribe({
      next: () => {
        this.statusLeaveGroupRol = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Rol removido del grupo exitosamente</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          removed : true
        });
      },
      error : () => {
        this.statusLeaveGroupRol = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al remover el rol del grupo, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

}
