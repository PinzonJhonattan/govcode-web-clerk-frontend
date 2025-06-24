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
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";

interface DialogSubGroupDeleteClerkData {
  infoSubGroup : GroupItem
}

@Component({
  selector: 'app-delete-subgroup',
  templateUrl: './delete-subgroup.component.html',
  styleUrls: ['./delete-subgroup.component.scss'],
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
export class DeleteSubgroupComponent implements OnInit {

  public statusDeleteGroup: statusOperation = 'init';

  constructor(
    public dialogRef: MatDialogRef<DeleteSubgroupComponent>,
    @Inject(DIALOG_DATA) public subGroupClerkData: DialogSubGroupDeleteClerkData,
    private subGroupClerkService: ManageGroupsClerkService
  ) { }

  ngOnInit(): void {

  }

  handleDeleteSubGroup(){
    this.statusDeleteGroup = 'loading'
    this.subGroupClerkService.deleteGroup(this.subGroupClerkData.infoSubGroup.id).subscribe({
      next: () => {
        this.statusDeleteGroup = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Subgrupo eliminado exitosamente</p>`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          deleted : true
        });
      },
      error : () => {
        this.statusDeleteGroup = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al eliminar el subgrupo, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

}
