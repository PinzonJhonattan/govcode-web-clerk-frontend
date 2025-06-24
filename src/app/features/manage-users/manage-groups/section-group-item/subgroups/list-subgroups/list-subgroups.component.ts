import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "@shared/shared.module";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {MatDialog} from "@angular/material/dialog";
import {columnsSubgroupGroup} from "@features/manage-users/manage-groups/constants/columns-subgroups-group";
import {
  CreateSubgroupComponent
} from "@features/manage-users/manage-groups/section-group-item/subgroups/create-subgroup/create-subgroup.component";
import {
  EditSubGroupComponent
} from "@features/manage-users/manage-groups/section-group-item/subgroups/edit-subgroup/edit-subgroup.component";
import {
  DeleteSubgroupComponent
} from "@features/manage-users/manage-groups/section-group-item/subgroups/delete-subgroup/delete-subgroup.component";
import {MoveGroupsComponent} from "@features/manage-users/manage-groups/move-groups/move-groups.component";
import {
  ManageBreadcrumbGroupItemSection
} from "@features/manage-users/manage-groups/services/manage-breadcrumb-group-item";
import {TreeSectionGroupsService} from "@features/manage-users/manage-groups/services/tree-section-groups.service";
import {User} from "@features/manage-users/models/users.model";
import {
  LeaveManyRolesGroupComponent
} from "@features/manage-users/manage-groups/section-group-item/roles/leave-many-roles-group/leave-many-roles-group.component";
import {
  RemoveManySubgroupsGroupComponent
} from "@features/manage-users/manage-groups/section-group-item/subgroups/remove-many-subgroups-group/remove-many-subgroups-group.component";

@Component({
  selector: 'app-list-subgroups',
  templateUrl: './list-subgroups.component.html',
  styleUrls: ['./list-subgroups.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  standalone: true
})
export class ListSubgroupsComponent implements OnInit {

  groupInfo : GroupItem;
  columnsSubgroupsGroup : any[] = columnsSubgroupGroup
  dataTableSubgroupsGroup: any[] = [];
  stateLoadSubgroupsGroup: string = 'success';
  subgroupsSelected : GroupItem[] = [];

  constructor(private manageGroupsClerkService : ManageGroupsClerkService, private manageBreadcrumbGroupItemSection:  ManageBreadcrumbGroupItemSection, private generalGroupInfo : GeneralGroupInfo,
              public dialog: MatDialog, private treeGroupSectionService : TreeSectionGroupsService
  ) {
    this.groupInfo = this.generalGroupInfo.getActualGroup();
  }

  ngOnInit(): void {
    this.loadChildrenGroup();
  }

  loadChildrenGroup(){
    this.stateLoadSubgroupsGroup = 'loading'
    this.manageGroupsClerkService.getChildrenGroups(this.groupInfo.id).subscribe({
      next : (data) => {
        this.stateLoadSubgroupsGroup = 'success'
        this.dataTableSubgroupsGroup = data;
      },
      error : () => {
        this.stateLoadSubgroupsGroup = 'error'
      }
    })
  }

  handleCreateSubgroupToGroupModal(){
    const dialogRef = this.dialog.open(CreateSubgroupComponent, {
      width : "500px",
      data: {
        infoGroup : this.generalGroupInfo.getActualGroup()
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.created){
        this.loadChildrenGroup()
        this.treeGroupSectionService.reloadTreeGroups();
      }
    });
  }

  handleEditSubgroupToGroupModal(infoSubGroup){
    const dialogRef = this.dialog.open(EditSubGroupComponent, {
      width : "500px",
      data: {
        infoSubGroup
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.updated){
        this.loadChildrenGroup()
        this.treeGroupSectionService.reloadTreeGroups();
      }
    });
  }

  handleDeleteSubgroupToGroupModal(infoSubGroup){
    const dialogRef = this.dialog.open(DeleteSubgroupComponent, {
      width : "500px",
      data: {
        infoSubGroup
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.deleted){
        this.loadChildrenGroup()
        this.treeGroupSectionService.reloadTreeGroups();
      }
    });
  }

  handleRemoveSubgroupsFromGroupModal(){
    const dialogRef = this.dialog.open(RemoveManySubgroupsGroupComponent, {
      width : "auto",
      data: {
        infoSubGroups : this.subgroupsSelected
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.removed){
        this.loadChildrenGroup();
      }
    });
  }

  handleMoveSubGroup(infoGroupToMove){
    const dialogRef = this.dialog.open(MoveGroupsComponent, {
      width : "500px",
      data: {
        infoGroupToMove
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.groupMoved){
        this.loadChildrenGroup()
        this.treeGroupSectionService.reloadTreeGroups();
      }
    });
  }

  changeGroup(infoGroup){
    this.generalGroupInfo.setActualGroup(infoGroup);
    this.manageBreadcrumbGroupItemSection.appendGroup(infoGroup)
  }

  changeGroupsSelected(selectedSubgroupsRow : any[]){
    this.subgroupsSelected = selectedSubgroupsRow;
  }

}
