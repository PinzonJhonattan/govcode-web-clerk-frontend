import { Component, OnInit } from '@angular/core';
import {ComplexTableModule} from "@shared/components/complex-table/complex-table.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {
  ListMembersComponent
} from "@features/manage-users/manage-groups/section-group-item/members/list-members/list-members.component";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  standalone : true,
  imports: [ComplexTableModule, MatButtonModule, MatIconModule, ListMembersComponent]
})
export class MembersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
