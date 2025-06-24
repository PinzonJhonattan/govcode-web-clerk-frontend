import { Component, OnInit } from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";

import {
  columnsAssociateMembersToGroup
} from "@features/manage-users/manage-groups/constants/columns-members-to-associate-group";
import {ManageUsersService} from "@features/manage-users/services/manage-users.service";
import {User} from "@features/manage-users/models/users.model";
import {ComplexTableModule} from "@shared/components/complex-table/complex-table.module";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import Swal from "sweetalert2";

@Component({
  selector: 'app-associate-members',
  templateUrl: './associate-members.component.html',
  styleUrls: ['./associate-members.component.scss'],
  standalone : true,
  imports: [ComplexTableModule, CommonModule, MatDialogModule, MatButtonModule, MatProgressSpinnerModule]
})
export class AssociateMembersComponent implements OnInit {

  columnsAssociateMembersToGroup : any[] = columnsAssociateMembersToGroup
  dataTableAssociateMembersToGroup: any[] = [];
  stateLoadAssociateMembersToGroup: string = 'init';
  stateAssociateMembersToGroup: string = 'init';
  membersSelected : User[] = [];
  infoGroup : GroupItem;


  constructor(
    public dialogRef: MatDialogRef<AssociateMembersComponent>,
    private manageGroupsClerkService : ManageGroupsClerkService,
    private generalGroupInfo : GeneralGroupInfo,
  ) {
    this.infoGroup = this.generalGroupInfo.getActualGroup()
  }

  ngOnInit(): void {
   this.getRealmUsersNotInGroup()
  }

  getRealmUsersNotInGroup(){
    this.stateLoadAssociateMembersToGroup = 'loading'
    this.manageGroupsClerkService.getUsersNotInGroup(this.infoGroup.id).subscribe({
      next : (users) => {
        this.dataTableAssociateMembersToGroup = users;
        this.stateLoadAssociateMembersToGroup = 'success'
      },
      error : () => {
        this.stateLoadAssociateMembersToGroup = 'error'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Ha ocurrido un error al asociar los miembros al grupo</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

  handleAssociateMembersGroup(){
    this.stateAssociateMembersToGroup = 'loading'
    this.manageGroupsClerkService.associateMembersToGroup(this.infoGroup.id, this.membersSelected.map(member => member.id)).subscribe({
      next : (users) => {
        this.stateAssociateMembersToGroup = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Usuario${this.membersSelected.length == 1 ? '' : 's'} asociado${this.membersSelected.length == 1 ? '' : 's'} exitosamente</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          associated : true
        })
      },
      error : () => {
        this.stateAssociateMembersToGroup = 'error'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Ha ocurrido un error al asociar los usuarios al grupo</p>`,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

  changeMembersSelected(selectedMembersRow : any[]){
    this.membersSelected = selectedMembersRow;
  }

}
