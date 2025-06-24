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
import {RolesClerk} from "@features/manage-users/models/roles.model";
import {ManageRolesClerkService} from "@features/manage-users/services/roles.service";
import Swal from "sweetalert2";
import {statusOperation} from "@shared/models/status.model";

interface DialogRoleDeleteClerkData {
  infoRole : RolesClerk
}


@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.scss'],
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
export class DeleteRoleComponent implements OnInit {

  public statusDeleteRole: statusOperation = 'init';

  constructor(
    public dialogRef: MatDialogRef<DeleteRoleComponent>,
    @Inject(DIALOG_DATA) public roleClerkData: DialogRoleDeleteClerkData,
    private rolesClerkService: ManageRolesClerkService

  ) { }

  ngOnInit(): void {

  }

  handleDeleteRole(){
    this.statusDeleteRole = 'loading'
    this.rolesClerkService.deleteRole(this.roleClerkData.infoRole.id).subscribe({
      next: () => {
        this.statusDeleteRole = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Rol eliminado exitosamente</p>`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          deleted : true
        });
      },
      error : () => {
        this.statusDeleteRole = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al eliminar el rol, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

}
