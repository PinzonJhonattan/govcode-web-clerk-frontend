import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentsModule} from "@shared/components/components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {statusOperation} from "@shared/models/status.model";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import Swal from "sweetalert2";

interface DialogGroupEditClerkData {
  infoGroup : GroupItem
}


@Component({
  selector: 'app-edit-group',
  standalone: true,
    imports: [CommonModule, ComponentsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupClerkComponent implements OnInit {

  public editGroupClerkForm: FormGroup;
  public statusCreateGroupClerk: statusOperation = 'init';
  public messageErrorCreateGroupClerk : string = '';


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditGroupClerkComponent>,
    @Inject(DIALOG_DATA) public groupClerkData: DialogGroupEditClerkData,
    private manageGroupsClerkService : ManageGroupsClerkService
  ) {
    this.editGroupClerkForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.manageGroupsClerkService.getGroupById(this.groupClerkData.infoGroup.id).subscribe({
      next : (data) => {
        this.editGroupClerkForm.patchValue({
          name : data.name
        })
      },
      error : () => {

      }
    })
  }

  handleEditGroup(){
    if(this.editGroupClerkForm.invalid){
      this.editGroupClerkForm.markAllAsTouched();
    }

    const groupId = this.groupClerkData.infoGroup.id;

    this.manageGroupsClerkService.editGroup(groupId, {
      id : groupId,
      name : this.editGroupClerkForm.value['name'],
    }).subscribe({
      next : () => {
        Swal.fire({
          position: "bottom-end",
          html: `<p>Grupo actualizado exitosamente</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          updated : true
        })
      },
      error : () => {
        this.messageErrorCreateGroupClerk = 'Ha ocurrido un error al editar el grupo, intente de nuevo'
      }
    })

  }

}
