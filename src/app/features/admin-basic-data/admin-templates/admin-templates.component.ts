import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

@Component({
  selector: 'app-admin-templates',
  templateUrl: './admin-templates.component.html',
  styleUrls: ['./admin-templates.component.scss']
})
export class AdminTemplatesComponent implements OnInit {
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
