import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { columnsManageCitizens } from '@features/manage-citizens/constants/columns-manage-citizens';
import { ResetPasswordModalComponent } from '@features/manage-citizens/reset-password-modal/reset-password-modal.component';
import { ManageCitizensService } from '@features/manage-citizens/services/manage-citizens.service';
import {
  DeactivateMemberComponent
} from "@features/manage-citizens/manage-citizens-tabs/deactivate-member/deactivate-member.component";
import {
  ViewUserRolesComponent
} from "@features/manage-citizens/manage-citizens-tabs/view-user-roles/view-user-roles.component";
import {DeleteUserComponent} from "@features/manage-citizens/manage-citizens-tabs/delete-user/delete-user.component";


@Component({
  selector: 'app-list-of-citizens',
  templateUrl: './list-of-citizens.component.html',
  styleUrls: ['./list-of-citizens.component.scss']
})
export class ListOfCitizensComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.getCitizensData();
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnsManageCitizens;
  dataTableCitizens: any[] = [];
  state: string = 'idle';

  constructor(
    private manageCitizensService: ManageCitizensService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCitizensData();
  }

  getCitizensData() {
    this.state = 'loading';
    this.manageCitizensService.getCitizens().subscribe({
      next: (response) => {
        this.state = 'success';
        console.log(response);
        response = response.map((citizen) => {
          return {
            ...citizen,
            namesOrCompanyName : citizen.attributes.namesOrCompanyName,
            linkButtonEdit: `edit/${citizen.id}`
          };
        });
        this.dataTableCitizens = response;
      },
      error: (error) => {
        this.state = 'error';
        console.error(error);
      }
    })
  }

  resetPassword(infoUser) {
    const resetPasswordModal = this.dialog.open(ResetPasswordModalComponent, {
      data: { infoUser }
    });
  }

  handleEnabledStateMemberModal(infoMember){
    const dialogRef = this.dialog.open(DeactivateMemberComponent, {
      width : "auto",
      data: {
        infoMember
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.updated){
        this.getCitizensData()
      }
    });
  }

  handleViewRolesUser(infoUser){
    const dialogRef = this.dialog.open(ViewUserRolesComponent, {
      width : "auto",
      data: {
        infoUser
      },
    });
  }

  removeUser(infoUser){
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width : "500px",
      data: {
        infoUser
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.deleted){
        this.getCitizensData();
      }
    });
  }

}
