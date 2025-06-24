import {Component, Inject, OnInit} from '@angular/core';
import {statesProcess} from "@shared/models/statesRequest.model";
import {ManageUsersService} from "@features/manage-users/services/manage-users.service";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {columnsViewRoles} from "@features/manage-citizens/manage-citizens-tabs/constants/columns-view-roles";
import {ManageCitizensService} from "@features/manage-citizens/services/manage-citizens.service";
import {ComplexTableModule} from "@shared/components/complex-table/complex-table.module";

interface DialogUserRolesData {
  infoUser : any
}

@Component({
  selector: 'app-view-user-roles',
  templateUrl: './view-user-roles.component.html',
  styleUrls: ['./view-user-roles.component.scss'],
  standalone : true,
  imports : [ComplexTableModule, MatDialogModule]
})
export class ViewUserRolesComponent implements OnInit {

  columnsRoles: any[] = columnsViewRoles;
  dataTableRoles: any[] = [];
  stateLoadRoles: statesProcess = 'init';

  constructor(private manageCitizensService : ManageCitizensService,  public dialogRef: MatDialogRef<ViewUserRolesComponent>,
              @Inject(DIALOG_DATA) public userData: DialogUserRolesData,) { }

  ngOnInit(): void {
    this.getUserRoles();
  }

  getUserRoles() {
    this.stateLoadRoles = 'loading';

    this.manageCitizensService.getCitizenById(this.userData.infoUser.id).subscribe({
      next: (response) => {
        this.stateLoadRoles = 'success';
        this.dataTableRoles = response.roles;
      },
      error: (error) => {
        this.stateLoadRoles = 'error';
        console.error(error);
      }
    })
  }

}
