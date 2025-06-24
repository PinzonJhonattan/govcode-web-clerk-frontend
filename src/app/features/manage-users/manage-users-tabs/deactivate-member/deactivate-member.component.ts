import {Component, Inject, OnInit} from '@angular/core';
import {statusOperation} from "@shared/models/status.model";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import Swal from "sweetalert2";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {User} from "@features/manage-users/models/users.model";
import {ManageUsersService} from "@features/manage-users/services/manage-users.service";

interface DialogDeactivateMemberData {
  infoMember : User
}

@Component({
  selector: 'app-delete-member',
  templateUrl: './deactivate-member.component.html',
  styleUrls: ['./deactivate-member.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true
})
export class DeactivateMemberComponent implements OnInit {

  public statusDeactivateMember: statusOperation = 'init';
  public statusEnabledUser;

  constructor(
    public dialogRef: MatDialogRef<DeactivateMemberComponent>,
    @Inject(DIALOG_DATA) public memberData: DialogDeactivateMemberData,
    private manageUsersService : ManageUsersService
  ) { }

  ngOnInit(): void {
    this.statusEnabledUser = this.memberData.infoMember.enabled
  }

  handleDeactivateMember(){
    this.statusDeactivateMember = 'loading'
    this.manageUsersService.updateUser(this.memberData.infoMember.id, {
      ...this.memberData.infoMember,
      enabled : !this.memberData.infoMember.enabled,
      roles : [],
    }).subscribe({
      next: () => {
        this.statusDeactivateMember = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Usuario ${this.statusEnabledUser ? 'Desactivado' : 'Activado'} exitosamente</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          updated : true
        });
      },
      error : () => {
        this.statusDeactivateMember = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al ${this.statusEnabledUser ? 'Desactivar' : 'Activar'} el usuario, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

}
