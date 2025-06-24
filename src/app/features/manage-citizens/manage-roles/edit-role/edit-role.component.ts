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
import {RolesClerk} from "@features/manage-users/models/roles.model";
import Swal from "sweetalert2";
import {ComponentsModule} from "@shared/components/components.module";
import {ManageRolesCitizenService} from "@features/manage-citizens/services/roles.service";

interface DialogRoleEditClerkData {
  infoRole : RolesClerk
}


@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
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
export class EditRoleComponent implements OnInit {


  public editRolesForm: FormGroup;
  public statusGetRoleByIdRole: statusOperation = 'init';
  public statusEditRole: statusOperation = 'init';
  public messageError : string = '';


  constructor(
    public dialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(DIALOG_DATA) public roleClerkData: DialogRoleEditClerkData,
    private manageRolesCitizenService : ManageRolesCitizenService,
    private fb: FormBuilder,

  ) {
    this.editRolesForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.statusGetRoleByIdRole = 'loading'
    this.manageRolesCitizenService.getRoleById(this.roleClerkData.infoRole.id).subscribe({
      next: (data) =>{
        this.statusGetRoleByIdRole = 'success'
        this.editRolesForm.patchValue({
          name: data.name,
          description: data.description,
        })
      },
      error: error => {
        this.statusGetRoleByIdRole = 'error'
        this.messageError = 'Error: ' + error?.error?.message || 'Ha ocurrido un error al traer la información del rol, intente de nuevo'
      }
    })
  }

  handleEditRole () {
    this.statusEditRole = 'loading'

    if(this.editRolesForm.invalid){
      this.editRolesForm.markAllAsTouched();
      return;
    }

    this.manageRolesCitizenService.editRole(this.roleClerkData.infoRole.id, {
      ...this.roleClerkData.infoRole,
      ...this.editRolesForm.value
    }).subscribe({
      next: (data) => {
        this.statusEditRole = 'success'
        this.dialogRef.close({
          updated : true
        })

        Swal.fire({
          position: "bottom-end",
          html: `<p>Rol de ciudadano editado exitosamente</p>`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      },
      error: error => {
        this.statusEditRole = 'error'
        this.messageError = 'Error: ' + error?.error?.message || 'Ha ocurrido un error al editar el rol de ciudadano intente de nuevo'
      }
    })
  }

}
