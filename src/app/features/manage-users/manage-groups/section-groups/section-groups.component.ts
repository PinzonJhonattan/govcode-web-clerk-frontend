import { Component, OnInit } from '@angular/core';
import {
  ListGroupsComponent
} from "@features/manage-users/manage-groups/section-groups/list-groups/list-groups.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateGroupClerkComponent} from "@features/manage-users/manage-groups/section-groups/create-group/create-group.component";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {NgIf} from "@angular/common";
import {
  ManageBreadcrumbGroupItemSection
} from "@features/manage-users/manage-groups/services/manage-breadcrumb-group-item";
import {TreeSectionGroupsService} from "@features/manage-users/manage-groups/services/tree-section-groups.service";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";
import {SharedModule} from "@shared/shared.module";

@Component({
  selector: 'app-section-groups',
  templateUrl: './section-groups.component.html',
  styleUrls: ['./section-groups.component.scss'],
  imports: [
    ListGroupsComponent,
    MatIconModule,
    MatButtonModule,
    NgIf,
    SharedModule
  ],
  standalone: true
})
export class SectionGroupsComponent implements OnInit {

  infoGroup : GroupItem;

  constructor(
    public dialog: MatDialog,
    public generalGroupInfo : GeneralGroupInfo,
    private manageBreadcrumbGroupItemService : ManageBreadcrumbGroupItemSection,
    private treeSectionGroupService : TreeSectionGroupsService
  ) {
    this.infoGroup = generalGroupInfo.getActualGroup();
  }

  ngOnInit(): void {
    this.generalGroupInfo.actualGroup$.subscribe(data => {
      this.infoGroup = data;
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
        this.manageBreadcrumbGroupItemService.setActualGroups(null);
        this.generalGroupInfo.resetActualGroup();
        this.treeSectionGroupService.reloadTreeGroups();
      }
    });
  }

  protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
