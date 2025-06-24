import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-identification-types',
  templateUrl: './identification-types.component.html',
  styleUrls: ['./identification-types.component.scss']
})
export class IdentificationTypesComponent implements OnInit {
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

}
