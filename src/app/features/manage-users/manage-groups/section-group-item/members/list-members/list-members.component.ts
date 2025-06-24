import { Component, OnInit } from '@angular/core';
import {columnsMembersGroup} from "@features/manage-users/manage-groups/constants/columns-members-group";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {ComplexTableModule} from "@shared/components/complex-table/complex-table.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {
  AssociateMembersComponent
} from "@features/manage-users/manage-groups/section-group-item/members/associate-members/associate-members.component";
import {
  DeactivateMemberComponent
} from "@features/manage-users/manage-users-tabs/deactivate-member/deactivate-member.component";
import {
  LeaveGroupMember
} from "@features/manage-users/manage-groups/section-group-item/members/leave-group-member/leave-group-member.component";
import {User} from "@features/manage-users/models/users.model";
import {
  DeleteManyMembersComponent
} from "@features/manage-users/manage-groups/section-group-item/members/delete-many-members/delete-many-members.component";

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.scss'],
  standalone : true,
  imports: [ComplexTableModule, MatButtonModule, MatIconModule]
})
export class ListMembersComponent implements OnInit {

  groupInfo : GroupItem;
  columnsMembersGroup : any[] = columnsMembersGroup
  dataTableMembersGroup: any[] = [];
  stateLoadMembersGroup: string = 'init';
  membersSelected : User[] = [];

  constructor(private manageGroupsClerkService : ManageGroupsClerkService, private generalGroupInfo : GeneralGroupInfo,     public dialog: MatDialog
  ) {
    this.groupInfo = this.generalGroupInfo.getActualGroup();
  }

  ngOnInit(): void {
   this.loadMembers();
  }

  loadMembers (){
    this.stateLoadMembersGroup = 'loading'
    this.manageGroupsClerkService.getMembers(this.groupInfo.id).subscribe({
      next : (data) => {
        this.stateLoadMembersGroup = 'success'
        this.dataTableMembersGroup = data;
      },
      error : () => {
        this.stateLoadMembersGroup = 'error'
      }
    })
  }

  handleAssociateMemberToGroupModal(){
    const dialogRef = this.dialog.open(AssociateMembersComponent, {
      width : "auto",
      data: {
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.associated){
        this.loadMembers()
      }
    });
  }

  handleDeleteManyMembers(){
    const dialogRef = this.dialog.open(DeleteManyMembersComponent, {
      width : "auto",
      data: {
        infoMembers : this.membersSelected
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.removed){
        this.loadMembers()
      }
    });  }

  handleEnabledStateMemberModal(infoMember){
    const dialogRef = this.dialog.open(DeactivateMemberComponent, {
      width : "auto",
      data: {
        infoMember
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.updated){
        this.loadMembers()
      }
    });
  }

  handleLeaveMemberFromGroupModal(infoMember){
    const dialogRef = this.dialog.open(LeaveGroupMember, {
      width : "auto",
      data: {
        infoMember
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.removed){
        this.loadMembers()
      }
    });
  }

  changeMembersSelected(selectedMembersRow : any[]){
    this.membersSelected = selectedMembersRow;
  }
}
