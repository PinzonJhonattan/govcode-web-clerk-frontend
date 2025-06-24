import {Component, Input, OnInit} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {DynamicDataSource} from "@features/manage-users/manage-groups/section-groups/list-groups/DynamicDataSource";
import {DynamicFlatNode} from "@features/manage-users/manage-groups/section-groups/list-groups/DynamicFlatNode";
import {DynamicDatabase} from "@features/manage-users/manage-groups/section-groups/list-groups/DynamicDatabase";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EditGroupClerkComponent} from "@features/manage-users/manage-groups/section-groups/edit-group/edit-group.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteGroupClerkComponent} from "@features/manage-users/manage-groups/section-groups/delete-group/delete-group.component";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {
  ManageBreadcrumbGroupItemSection
} from "@features/manage-users/manage-groups/services/manage-breadcrumb-group-item";
import {TreeSectionGroupsService} from "@features/manage-users/manage-groups/services/tree-section-groups.service";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatMenuModule} from "@angular/material/menu";
import {MoveGroupsComponent} from "@features/manage-users/manage-groups/move-groups/move-groups.component";
import {MatCardModule} from "@angular/material/card";
import {statesProcess} from "@shared/models/statesRequest.model";
import {
  CreateSubgroupComponent
} from "@features/manage-users/manage-groups/section-group-item/subgroups/create-subgroup/create-subgroup.component";
import {
  CreateGroupClerkComponent
} from "@features/manage-users/manage-groups/section-groups/create-group/create-group.component";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";
import {SharedModule} from "@shared/shared.module";

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss'],
  imports: [
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatMenuModule,
    MatCardModule,
    SharedModule
  ],
  standalone: true
})
export class ListGroupsComponent implements OnInit {

  @Input() openCreateGroupModal : () => void;

  stateLoadingDataGroups : statesProcess = 'init';

  constructor(private database: DynamicDatabase, private treeSectionGroupService : TreeSectionGroupsService, private manageBreadcrumbGroupItemService : ManageBreadcrumbGroupItemSection, private dialog : MatDialog, private generalGroupInfo : GeneralGroupInfo, private manageBreadcrumbGroupItemSection:ManageBreadcrumbGroupItemSection) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.loadInitialData();

  }

  async loadInitialData (){
    try {
      this.stateLoadingDataGroups = 'loading'
      const initialData = await this.database.initialData();
      this.treeControl.dataNodes = [];
      this.dataSource = new DynamicDataSource(this.treeControl, this.database);
      this.dataSource.data = initialData;

      this.stateLoadingDataGroups = 'success'
    }catch (error){
      this.stateLoadingDataGroups = 'error'
    }
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit() {
    this.treeSectionGroupService.signalReloadTreeGroups$.subscribe(async () => {
      await this.loadInitialData()
    })
  }

  async createNewGroup(){
    const dialogRef = this.dialog.open(CreateGroupClerkComponent, {
      width : "500px",
      data: {
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.created){
        this.loadInitialData()
        this.manageBreadcrumbGroupItemService.setActualGroups(null);
        this.generalGroupInfo.resetActualGroup();
      }
    });
  }


  async createSubGroup(node){
    const dialogRef = this.dialog.open(CreateSubgroupComponent, {
      width : "500px",
      data: {
        infoGroup : node.item
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.created){
        this.loadInitialData()
        this.manageBreadcrumbGroupItemService.setActualGroups(null);
        this.generalGroupInfo.resetActualGroup();
      }
    });
  }

  async openEditGroupModal(infoGroup : GroupItem) {

    const dialogRef = this.dialog.open(EditGroupClerkComponent, {
      width : "500px",
      data: {
          infoGroup
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.updated){
        this.loadInitialData()
        this.manageBreadcrumbGroupItemService.setActualGroups(null);
        this.generalGroupInfo.resetActualGroup();

      }
    });
  }

 async openDeleteGroupModal(infoGroup : GroupItem) {

    const dialogRef = this.dialog.open(DeleteGroupClerkComponent, {
      width : "500px",
      data: {
        infoGroup
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.deleted){
        this.loadInitialData()
        this.manageBreadcrumbGroupItemService.setActualGroups(null);
        this.generalGroupInfo.resetActualGroup();

      }
    });
  }

  async handleMoveGroup(infoGroupToMove){
    const dialogRef = this.dialog.open(MoveGroupsComponent, {
      width : "500px",
      data: {
        infoGroupToMove
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.groupMoved){
        this.loadInitialData()
        this.manageBreadcrumbGroupItemService.setActualGroups(null);
        this.generalGroupInfo.resetActualGroup();
      }
    });
  }
  changeGroup (group : GroupItem){
    this.generalGroupInfo.setActualGroup(group)
    this.manageBreadcrumbGroupItemSection.setActualGroups([group])
  }

  protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
