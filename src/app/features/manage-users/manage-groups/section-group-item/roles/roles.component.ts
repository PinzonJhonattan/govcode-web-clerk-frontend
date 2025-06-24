import { Component, OnInit } from '@angular/core';
import {
    ListMembersComponent
} from "@features/manage-users/manage-groups/section-group-item/members/list-members/list-members.component";
import {
  ListRolesComponent
} from "@features/manage-users/manage-groups/section-group-item/roles/list-roles/list-roles.component";

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
  imports: [
    ListMembersComponent,
    ListRolesComponent
  ],
    standalone: true
})
export class RolesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
