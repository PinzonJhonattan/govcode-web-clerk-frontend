import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {PageLayoutModule} from "@vex/components/page-layout/page-layout.module";
import {MatIconModule} from "@angular/material/icon";
import {MembersComponent} from "@features/manage-users/manage-groups/section-group-item/members/members.component";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {RolesComponent} from "@features/manage-users/manage-groups/section-group-item/roles/roles.component";
import {
  SubgroupsComponent
} from "@features/manage-users/manage-groups/section-group-item/subgroups/subgroups.component";
import {ComplexTableModule} from "@shared/components/complex-table/complex-table.module";
import {MatButtonModule} from "@angular/material/button";
import {columnsGroups} from "@features/manage-users/manage-groups/constants/columns-groups";
import {
  CreateGroupClerkComponent
} from "@features/manage-users/manage-groups/section-groups/create-group/create-group.component";
import {MatDialog} from "@angular/material/dialog";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {MoveGroupsComponent} from "@features/manage-users/manage-groups/move-groups/move-groups.component";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {
  ManageBreadcrumbGroupItemSection
} from "@features/manage-users/manage-groups/services/manage-breadcrumb-group-item";
import {TreeSectionGroupsService} from "@features/manage-users/manage-groups/services/tree-section-groups.service";
import {
  EditGroupClerkComponent
} from "@features/manage-users/manage-groups/section-groups/edit-group/edit-group.component";
import {
  DeleteGroupClerkComponent
} from "@features/manage-users/manage-groups/section-groups/delete-group/delete-group.component";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";
import {SharedModule} from "@shared/shared.module";

@Component({
  selector: 'app-section-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
  imports: [
    MatTabsModule,
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    PageLayoutModule,
    MatIconModule,
    MembersComponent,
    RolesComponent,
    SubgroupsComponent,
    ComplexTableModule,
    MatButtonModule,
    NgClass,
    SharedModule
  ],
  standalone: true
})
export class GroupItemComponent implements OnInit {

  public isChangingGroup : boolean = false;
  columnsGroups : any[] = columnsGroups
  dataTableGroups: any[] = [];
  stateLoadGroups: string = 'success';
  actualGroupsOpen : GroupItem[] = [];
  actualSelectedGroup : GroupItem = null;

  constructor(public generalGroupInfo :  GeneralGroupInfo, private treeSectionGroupsService : TreeSectionGroupsService, private changeDetector :  ChangeDetectorRef, private manageBreadcrumbGroupItemSection : ManageBreadcrumbGroupItemSection, private dialog : MatDialog, private manageGroupsService : ManageGroupsClerkService) { }

  ngOnInit(): void {
    this.generalGroupInfo.actualGroup$.subscribe(data => {
        this.isChangingGroup = true;
        this.changeDetector.detectChanges()
        this.isChangingGroup = false
        if(!data){
          this.loadGroups()
        }
    })
    this.manageBreadcrumbGroupItemSection.actualGroups$.subscribe(data => {
        this.actualGroupsOpen = data || [];
    })

  }

  changeToRootGroup(){
    this.manageBreadcrumbGroupItemSection.setActualGroups([]);
    this.generalGroupInfo.resetActualGroup()
  }

  changeToIntermediateGroup(actualGroup, indexGroup){
    this.actualGroupsOpen = this.actualGroupsOpen.slice(0, indexGroup + 1);
    this.actualSelectedGroup = this.actualGroupsOpen[this.actualGroupsOpen.length - 1];
    this.manageBreadcrumbGroupItemSection.setActualGroups(this.actualGroupsOpen);
    this.generalGroupInfo.setActualGroup(this.actualSelectedGroup);
  }

  loadGroups(){
    this.stateLoadGroups = 'loading'
    this.manageGroupsService.getRootGroups().subscribe({
      next : (data) => {
        this.stateLoadGroups = 'success'
        this.dataTableGroups = data;
      },
      error : () => {
        this.stateLoadGroups = 'error'
      }
    })

  }

  openCreateGroupModal(): void {
    const dialogRef = this.dialog.open(CreateGroupClerkComponent, {
      width : "500px",
      data: {
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.created){
        this.loadGroups()
        this.treeSectionGroupsService.reloadTreeGroups();

      }
    });
  }

  changeGroup(infoGroup){
    this.actualGroupsOpen.push(infoGroup)
    this.generalGroupInfo.setActualGroup(infoGroup)
  }

  async handleEditGroupModal(infoGroup : GroupItem) {

    const dialogRef = this.dialog.open(EditGroupClerkComponent, {
      width : "500px",
      data: {
        infoGroup
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.updated){
        this.loadGroups()
        this.treeSectionGroupsService.reloadTreeGroups();
      }
    });
  }

  async handleDeleteGroupModal(infoGroup : GroupItem) {
    const dialogRef = this.dialog.open(DeleteGroupClerkComponent, {
      width : "500px",
      data: {
        infoGroup
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.deleted){
        this.loadGroups()
        this.treeSectionGroupsService.reloadTreeGroups();
      }
    });
  }

  handleMoveSubGroup(infoGroupToMove) {
    const dialogRef = this.dialog.open(MoveGroupsComponent, {
      width: "500px",
      data: {
        infoGroupToMove
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.groupMoved) {
        this.loadGroups()
        this.treeSectionGroupsService.reloadTreeGroups();
      }
    });
  }

    protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
