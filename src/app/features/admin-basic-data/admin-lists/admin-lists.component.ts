import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-lists',
  templateUrl: './admin-lists.component.html',
  styleUrls: ['./admin-lists.component.scss']
})
export class AdminListsComponent {
  @ViewChild('myTabGroup') myTabGroup: MatTabGroup;

  comesFromForm: boolean = false;

  constructor() { }

  handleFormSubmitted() {
    // Cuando el formulario de creación se envía, redireccino al tab de lista de trámites
    this.myTabGroup.selectedIndex = 0;
    this.comesFromForm = !this.comesFromForm;
  }

}
