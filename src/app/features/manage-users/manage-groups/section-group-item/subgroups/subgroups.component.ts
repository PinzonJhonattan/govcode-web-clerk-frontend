import { Component, OnInit } from '@angular/core';
import {
  ListSubgroupsComponent
} from "@features/manage-users/manage-groups/section-group-item/subgroups/list-subgroups/list-subgroups.component";
import {SharedModule} from "@shared/shared.module";

@Component({
    selector: 'app-subgroups',
    templateUrl: './subgroups.component.html',
    styleUrls: ['./subgroups.component.scss'],
  imports: [
    ListSubgroupsComponent,
    SharedModule
  ],
    standalone: true
})
export class SubgroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
