import { Component, OnInit } from '@angular/core';
import {ComponentsModule} from "@shared/components/components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {statusOperation} from "@shared/models/status.model";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
  imports: [
    ComponentsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true
})
export class CreateGroupClerkComponent implements OnInit {

  public createGroupClerkForm: FormGroup;
  public statusCreateGroupClerk: statusOperation = 'init';
  public messageErrorCreateGroupClerk : string = '';


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateGroupClerkComponent>,
    private manageGroupsClerkService : ManageGroupsClerkService
  ) {
    this.createGroupClerkForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  handleCreateGroup(){
    if(this.createGroupClerkForm.invalid){
      this.createGroupClerkForm.markAllAsTouched();
      return;
    }
    this.statusCreateGroupClerk = 'loading'
    this.manageGroupsClerkService.createGroup({
      name: this.createGroupClerkForm.value['name'],
    }).subscribe({
      next: (data) =>{
        this.statusCreateGroupClerk = 'success'
        Swal.fire({
          position: "bottom-end",
          html: `<p>Grupo creado exitosamente</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.dialogRef.close({
          created : true
        })
      },
      error: (data) =>{
        this.statusCreateGroupClerk = 'error'
        this.messageErrorCreateGroupClerk = 'Error al crear un nuevo grupo, revise que no exista un grupo con el mismo nombre'
      }
    })
  }

}
