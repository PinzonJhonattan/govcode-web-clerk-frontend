import { Component, OnInit } from '@angular/core';
import {ComponentsModule} from "@shared/components/components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-recovery-password-alert',
  templateUrl: './recovery-password-alert.component.html',
  styleUrls: ['./recovery-password-alert.component.scss'],
  imports: [
    ComponentsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  standalone: true
})
export class RecoveryPasswordAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
