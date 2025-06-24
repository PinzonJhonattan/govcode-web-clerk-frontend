import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {statusOperation} from "@shared/models/status.model";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import Swal from "sweetalert2";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";

interface DialogRemoveSubGroupsData {
  infoSubGroups : GroupItem[]
}

@Component({
  selector: 'app-remove-many-subgroups-group',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './remove-many-subgroups-group.component.html',
  styleUrls: ['./remove-many-subgroups-group.component.scss']
})
export class RemoveManySubgroupsGroupComponent implements OnInit {
  public statusRemoveGroupSubGroups: statusOperation = 'init';
  subgroupsLength = 0;

  constructor(
    public dialogRef: MatDialogRef<RemoveManySubgroupsGroupComponent>,
    @Inject(DIALOG_DATA) public removeSubGroupsData: DialogRemoveSubGroupsData,
    private manageGroupService : ManageGroupsClerkService,
    private generalGroupInfo : GeneralGroupInfo
  ) {
  }

  ngOnInit(): void {
    this.subgroupsLength = this.removeSubGroupsData.infoSubGroups.length
  }

  handleDeleteSubgroupsMembers(){
    this.statusRemoveGroupSubGroups = 'loading'
    this.manageGroupService.removeGroups(this.removeSubGroupsData.infoSubGroups.map(group => group.id)).subscribe({
      next: () => {
        this.statusRemoveGroupSubGroups = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Se han removido los subgrupos seleccionados del grupo</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          removed : true
        });
      },
      error : () => {
        this.statusRemoveGroupSubGroups = 'error'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Error: Ha ocurrido un error al remover los subgrupos del grupo, intente de nuevo</p>`,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      }
    })
  }

}
