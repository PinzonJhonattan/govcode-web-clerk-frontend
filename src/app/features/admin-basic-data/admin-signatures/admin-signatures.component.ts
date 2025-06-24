import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";
import {ManageUsersService} from "@features/manage-users/services/manage-users.service";

@Component({
  selector: 'app-admin-signatures',
  templateUrl: './admin-signatures.component.html',
  styleUrls: ['./admin-signatures.component.scss']
})
export class AdminSignaturesComponent implements OnInit {
  @ViewChild('myTabGroup') myTabGroup: MatTabGroup;

  comesFromCreateForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleFormSubmitted() {
    // Cuando el formulario de creación se envía, redireccino al tab de lista de trámites
    this.myTabGroup.selectedIndex = 0;
    this.comesFromCreateForm = !this.comesFromCreateForm;
  }

    protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
