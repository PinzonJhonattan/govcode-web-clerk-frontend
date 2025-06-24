import {Component, Inject, OnInit} from '@angular/core';
import {statusOperation} from "@shared/models/status.model";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import Swal from "sweetalert2";
import {RolesClerk} from "@features/manage-users/models/roles.model";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";

interface DialogGroupDeleteClerkData {
  infoGroup : RolesClerk
}

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss'],
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
export class DeleteGroupClerkComponent implements OnInit {

  public statusDeleteClerkGroup: statusOperation = 'init';

  constructor(
    public dialogRef: MatDialogRef<DeleteGroupClerkComponent>,
    @Inject(DIALOG_DATA) public groupClerkData: DialogGroupDeleteClerkData,
    private groupsClerkService: ManageGroupsClerkService

  ) { }

  ngOnInit(): void {

  }

  handleDeleteGroup(){
    this.statusDeleteClerkGroup = 'loading'
    this.groupsClerkService.deleteGroup(this.groupClerkData.infoGroup.id).subscribe({
      next: () => {
        this.statusDeleteClerkGroup = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Grupo eliminado exitosamente</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          deleted : true
        });
      },
      error : () => {
        this.statusDeleteClerkGroup = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al eliminar el grupo, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

}
