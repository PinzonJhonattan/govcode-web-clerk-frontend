import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import Swal from "sweetalert2";
import {statusOperation} from "@shared/models/status.model";
import {ManageUsersService} from "@features/manage-users/services/manage-users.service";
import {ManageCitizensService} from "@features/manage-citizens/services/manage-citizens.service";

interface DialogUserDeleteData {
  infoUser : any
}


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true
})
export class DeleteUserComponent implements OnInit {

  public statusDeleteUser: statusOperation = 'init';

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(DIALOG_DATA) public UserData: DialogUserDeleteData,
    private manageCitizensService: ManageCitizensService

  ) { }

  ngOnInit(): void {

  }

  handleDeleteUser(){
    this.statusDeleteUser = 'loading'

    this.manageCitizensService.deleteCitizen(this.UserData.infoUser.id).subscribe({
      next: () => {
        this.statusDeleteUser = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Usuario eliminado exitosamente</p>`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          deleted : true
        });
      },
      error : () => {
        this.statusDeleteUser = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al eliminar el usuario, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

}
