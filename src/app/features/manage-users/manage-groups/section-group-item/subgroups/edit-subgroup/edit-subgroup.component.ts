import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {statusOperation} from "@shared/models/status.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import Swal from "sweetalert2";
import {ComponentsModule} from "@shared/components/components.module";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";

interface DialogSubGroupEditClerkData {
  infoSubGroup : GroupItem
}


@Component({
  selector: 'app-edit-subgroup',
  templateUrl: './edit-subgroup.component.html',
  styleUrls: ['./edit-subgroup.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule
  ],
  standalone: true
})
export class EditSubGroupComponent implements OnInit {


  public editSubGroupsForm: FormGroup;
  public statusGetSubGroupByIdSubGroup: statusOperation = 'init';
  public statusEditSubGroup: statusOperation = 'init';
  public messageError : string = '';


  constructor(
    public dialogRef: MatDialogRef<EditSubGroupComponent>,
    @Inject(DIALOG_DATA) public subgroupClerkData: DialogSubGroupEditClerkData,
    private manageGroupsClerkService : ManageGroupsClerkService,
    private fb: FormBuilder,

  ) {
    this.editSubGroupsForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.statusGetSubGroupByIdSubGroup = 'loading'
    this.manageGroupsClerkService.getGroupById(this.subgroupClerkData.infoSubGroup.id).subscribe({
      next: (data) =>{
        this.statusGetSubGroupByIdSubGroup = 'success'
        this.editSubGroupsForm.patchValue({
          name: data.name,
        })
      },
      error: error => {
        this.statusGetSubGroupByIdSubGroup = 'error'
        this.messageError = 'Error: ' + error?.error?.message || 'Ha ocurrido un error al traer la información del group, intente de nuevo'
      }
    })
  }

  handleEditSubGroup () {
    this.statusEditSubGroup = 'loading'

    if(this.editSubGroupsForm.invalid){
      this.editSubGroupsForm.markAllAsTouched();
      return;
    }

    this.manageGroupsClerkService.editGroup(this.subgroupClerkData.infoSubGroup.id, {
      ...this.subgroupClerkData.infoSubGroup,
      ...this.editSubGroupsForm.value
    }).subscribe({
      next: (data) => {
        this.statusEditSubGroup = 'success'
        this.dialogRef.close({
          updated : true
        })

        Swal.fire({
          position: "bottom-end",
          html: `<p>Subgrupo editado exitosamente</p>`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      },
      error: error => {
        this.statusEditSubGroup = 'error'
        this.messageError = 'Error: ' + error?.error?.message || 'Ha ocurrido un error al editar el group intente de nuevo'
      }
    })
  }

}
