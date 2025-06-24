import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {statusOperation} from "@shared/models/status.model";
import Swal from "sweetalert2";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {ManageRolesCitizenService} from "@features/manage-citizens/services/roles.service";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule
  ],
  standalone: true
})
export class CreateRoleComponent implements OnInit {

  public rolesForm: FormGroup;
  public statusCreateRole: statusOperation = 'init';
  public messageError : string = '';


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateRoleComponent>,
    private manageRolesCitizenService : ManageRolesCitizenService
  ) {
    this.rolesForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  handleCreateRole(){
    if(this.rolesForm.invalid){
      this.rolesForm.markAllAsTouched();
      return;
    }

    this.statusCreateRole = 'loading'

    this.manageRolesCitizenService.createRole(this.rolesForm.value).subscribe({
      next : (data) =>{
        this.statusCreateRole = 'success'

        Swal.fire({
          position: "bottom-end",
          html: `<p>Rol de ciudadano creado exitosamente</p>`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })

        this.dialogRef.close({
          created : true
        })
      },
      error : (error) => {
        this.statusCreateRole = 'error';
        this.messageError = 'Error: ' + error?.error?.message || 'Ha ocurrido un error al crear el rol de ciudadano intente de nuevo'

      }
    })
  }

}
