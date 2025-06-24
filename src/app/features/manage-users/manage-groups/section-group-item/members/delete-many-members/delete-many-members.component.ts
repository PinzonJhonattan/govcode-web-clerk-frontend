import {Component, Inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {statusOperation} from "@shared/models/status.model";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import Swal from "sweetalert2";
import {User} from "@features/manage-users/models/users.model";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

interface DialogLeaveMembersData {
  infoMembers : User[]
}


@Component({
  selector: 'app-delete-many-members',
  templateUrl: './delete-many-members.component.html',
  styleUrls: ['./delete-many-members.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  standalone: true
})
export class DeleteManyMembersComponent implements OnInit {

  public statusLeaveGroupMembers: statusOperation = 'init';

  constructor(
    public dialogRef: MatDialogRef<DeleteManyMembersComponent>,
    @Inject(DIALOG_DATA) public membersData: DialogLeaveMembersData,
    private manageGroupService : ManageGroupsClerkService,
    private generalGroupInfo : GeneralGroupInfo
  ) { }

  ngOnInit(): void {
  }

  handleLeaveGroupMembers(){
    this.statusLeaveGroupMembers = 'loading'
    this.manageGroupService.leaveMembersFromGroup(this.generalGroupInfo.getActualGroup().id, this.membersData.infoMembers.map(member => member.id)).subscribe({
      next: () => {
        this.statusLeaveGroupMembers = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Se han removido los miembros del grupo seleccionados</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          removed : true
        });
      },
      error : () => {
        this.statusLeaveGroupMembers = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al remover los miembros del grupo, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }
}
