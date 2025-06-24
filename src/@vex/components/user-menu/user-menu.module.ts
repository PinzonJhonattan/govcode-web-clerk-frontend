import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu.component';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {ChangePasswordModule} from "@features/user-profile/change-password/change-password.module";

@NgModule({
  declarations: [
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatRippleModule,
    RouterModule,
    MatIconModule,
    ChangePasswordModule
  ],
  exports: [
    UserMenuComponent
  ]
})
export class UserMenuModule {
}
