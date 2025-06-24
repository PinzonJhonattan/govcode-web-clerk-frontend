import { Component, Inject, OnInit } from '@angular/core';
import { IdentityService } from "@shared/services/identity.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TasksService } from "@shared/services/tasks.service";
import { ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";

interface TaskData {
  assignee: string
  created: string
  id: string
  name: string
  processInstanceId: string
  assigneeRoleName: string
  assigneeRoleDescription: string

}
interface User {
  firstName: string
  lastName: string
  id: string
  username: string,
  label: string
}

@Component({
  selector: 'app-users-task-form',
  templateUrl: './assign-task-form.component.html',
  styleUrls: ['./assign-task-form.component.scss']
})
export class AssignTaskFormComponent implements OnInit {
  assignUserForm: FormGroup;
  users: User[] = [];
  taskAssigneeEdited: boolean = false;
  state: string = 'idle'

  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private identityService: IdentityService,
    private tasksService: TasksService,
    public assigneeDialogRef: MatDialogRef<AssignTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: TaskData) { }


  ngOnInit(): void {
    this.assignUserForm = this.fb.group({
      user: [this.taskData?.assignee ?? 'Sin Asignar', Validators.required]
    });

    this.getUsersByRole()
  }

  getUsersByRole() {
    this.state = 'loading'
    console.log(this.taskData)
    this.identityService.getUsersByRole(this.taskData.assigneeRoleName).subscribe({
      next: (data: any) => {
        this.users = data
        this.state = 'success'
      },
      error: () => {
        this.state = 'error'
      },
    });
  }

  deallocateTaskUser() {
    if (this.assignUserForm.invalid) {
      this.assignUserForm.markAllAsTouched();
      return
    }
    this.tasksService.deallocateTask(this.taskData.id, {
      "userId": this.assignUserForm.value.user,
      "groupId": null,
      "type": "assignee"
    }).subscribe({
      next: (data: any) => {
        this.taskAssigneeEdited = true
        this.assigneeDialogRef.close({ edited: this.taskAssigneeEdited })
      },
      error: () => {
      },
    });
  }

  assignTaskToUser(assignUserForm: FormGroup) {
    if (this.assignUserForm.invalid) {
      this.assignUserForm.markAllAsTouched();
      return
    }
    this.tasksService.assignTask(this.taskData.id, {
      "userId": this.assignUserForm.value.user,
      "groupId": null,
      "type": "assignee"
    }).subscribe({
      next: (data: any) => {
        this.taskAssigneeEdited = true
        this.assigneeDialogRef.close({ edited: this.taskAssigneeEdited })
      },
      error: () => {
        Swal.fire({
          position: "bottom-end",
          html: `<p>Ha ocurrido un error al asignar la tarea, intente de nuevo</p>`,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      },
    });
  }

}
