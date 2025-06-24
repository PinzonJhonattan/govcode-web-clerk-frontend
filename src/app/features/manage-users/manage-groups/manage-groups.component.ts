import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbsModule} from "@vex/components/breadcrumbs/breadcrumbs.module";
import {PageLayoutModule} from "@vex/components/page-layout/page-layout.module";
import {SectionGroupsComponent} from "@features/manage-users/manage-groups/section-groups/section-groups.component";
import {GroupItemComponent} from "@features/manage-users/manage-groups/section-group-item/group-item.component";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {NgStyle} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss'],
  standalone : true,
  imports: [BreadcrumbsModule, PageLayoutModule, SectionGroupsComponent, GroupItemComponent, NgStyle, SharedModule]
})
export class ManageGroupsComponent implements OnInit, OnDestroy {

  constructor(private generalGroupInfo : GeneralGroupInfo) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.generalGroupInfo.resetActualGroup();
  }


  protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
