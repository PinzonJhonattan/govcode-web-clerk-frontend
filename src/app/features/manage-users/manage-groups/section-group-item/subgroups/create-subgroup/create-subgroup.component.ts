import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentsModule} from "@shared/components/components.module";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {statusOperation} from "@shared/models/status.model";
import Swal from "sweetalert2";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GeneralGroupInfo} from "@features/manage-users/manage-groups/services/GeneralGroupInfo";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {DIALOG_DATA} from "@angular/cdk/dialog";

interface DialogSubGroupEditClerkData {
  infoGroup : GroupItem
}

@Component({
  selector: 'app-create-subgroup',
  standalone: true,
  imports: [CommonModule, ComponentsModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './create-subgroup.component.html',
  styleUrls: ['./create-subgroup.component.scss']
})
export class CreateSubgroupComponent implements OnInit {

  public subgroupsForm: FormGroup;
  public statusCreateSubgroup: statusOperation = 'init';
  public messageError : string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateSubgroupComponent>,
    private manageSubgroupsClerkService : ManageGroupsClerkService,
    @Inject(DIALOG_DATA) public data: DialogSubGroupEditClerkData,
  ) {
    this.subgroupsForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  handleCreateSubgroup(){

    if(this.subgroupsForm.invalid){
      this.subgroupsForm.markAllAsTouched();
      return;
    }

    this.statusCreateSubgroup = 'loading'

    this.manageSubgroupsClerkService.createSubgroup({
      name : this.subgroupsForm.value.name
    }, this.data.infoGroup.id).subscribe({
      next : (data) =>{
        this.statusCreateSubgroup = 'success'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Subgrupo creado exitosamente</p>`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })

        this.dialogRef.close({
          created : true
        })
      },
      error : (error) => {
        this.statusCreateSubgroup = 'error';
        this.messageError = 'Error: ' + (error?.error?.message || 'Ha ocurrido un error al crear el subgrupo, intente de nuevo')
        Swal.fire({
          position: "bottom-end",
          html: `<p>${this.messageError}</p>`,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        })

      }
    })
  }
}
