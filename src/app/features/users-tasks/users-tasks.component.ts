import {Component, OnInit} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {columnsAssignTask} from "@features/users-tasks/constants/columns-assign-task";
import {MatDialog} from '@angular/material/dialog';
import {AssignTaskFormComponent} from "@features/users-tasks/users-task-form/assign-task-form.component";
import {format} from "date-fns";
import {TasksService} from "@shared/services/tasks.service";
import { getFinalStringRoleNames } from '@vex/utils/get-final-string-role-names';
import { map, switchMap, tap } from 'rxjs';
import { columnsWorkLoad } from './constants/columns-work-load';

@Component({
  selector: 'app-users-tasks',
  templateUrl: './users-tasks.component.html',
  styleUrls: ['./users-tasks.component.scss']
})
export class UsersTasksComponent implements OnInit {
  layoutCtrl = new UntypedFormControl("boxed");
  columns: any[] = columnsAssignTask;
  dataTasks: any[] = [];
  state : string = 'idle'

  constructor(public dialog: MatDialog, private tasksService: TasksService) {
  }

  getAllTasks() {
    this.state = 'loading'
    this.tasksService.getAllTasks()
    .pipe(
      // switchMap(() => {
      //   return this.tasksService.taskWorkLoad()
      //   .pipe(
      //     map((data: any) => {
      //       console.log("data taskWorkLoad: ", data);
      //       this.dataWorkLoad = data;
      //     }),
      //     switchMap(() => {
      //       return this.tasksService.taskWorkLoadByRole('zCamunda - Rol Actor-Ventanilla')
      //       .pipe(
      //           tap(() => {
      //           }),
      //           map((data: any) => {
      //             console.log("data taskWorkLoadByRole zCamunda - Rol Actor-Ventanilla: ", data);
      //           })
      //         )
      //     })
      //   )
      // })
    )
    .subscribe({
      next: (data: any) => {
        if(data) {
          data = data?.map((process) => {
            // process date to a readable format
            const formatDate = format(
              new Date(process.created),
              "dd/MM/yyyy hh:mm:ss a"
            );
            return {
              ...process,
              assigneeRoleEdited: getFinalStringRoleNames(process.assigneeRole),
              assignee : process.assignee || 'Sin Asignar',
              created: formatDate,
              processDefinitionId : process.processDefinitionId.split(":")[0],
            };
          });
          this.dataTasks = data;
          this.state = 'success';
        }
      },
      error: () => {
        this.state = 'error'
      },
    });
  }

  ngOnInit(): void {
    this.getAllTasks()
  }

  openAssigneeTaskModal(data) {
    const taskFormDialog = this.dialog.open(AssignTaskFormComponent, {
      width: '30%',
      data
    });
    taskFormDialog.afterClosed().subscribe( (result) =>  {
      if(result && result?.edited){
        this.getAllTasks()
      }
    });
  }

  openEditModal = this.openAssigneeTaskModal.bind(this);

}
