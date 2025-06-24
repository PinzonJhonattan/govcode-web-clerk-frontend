import {Component, Inject, OnInit} from '@angular/core';
import {statusOperation} from "@shared/models/status.model";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import Swal from "sweetalert2";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {User} from "@features/manage-users/models/users.model";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";

interface DialogLeaveGroupMemberData {
  infoMember : User
}

@Component({
  selector: 'app-delete-member',
  templateUrl: './leave-group-member.component.html',
  styleUrls: ['./leave-group-member.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true
})
export class LeaveGroupMember implements OnInit {

  public statusLeaveGroupMember: statusOperation = 'init';

  constructor(
    public dialogRef: MatDialogRef<LeaveGroupMember>,
    @Inject(DIALOG_DATA) public memberData: DialogLeaveGroupMemberData,
    private manageGroupService : ManageGroupsClerkService,
    private generalGroupInfo : GeneralGroupInfo
  ) { }

  ngOnInit(): void {
  }

  handleLeaveGroupMember(){
    this.statusLeaveGroupMember = 'loading'
    this.manageGroupService.leaveMemberFromGroup(this.generalGroupInfo.getActualGroup().id ,this.memberData.infoMember.id).subscribe({
      next: () => {
        this.statusLeaveGroupMember = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Usuario removido del grupo exitosamente</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          removed : true
        });
      },
      error : () => {
        this.statusLeaveGroupMember = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al remover el usuario del grupo, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

}
