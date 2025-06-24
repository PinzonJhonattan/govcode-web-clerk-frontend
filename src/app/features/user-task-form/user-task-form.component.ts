import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { catchError, forkJoin, Observable, throwError } from "rxjs";
import { TaskFormService } from "@shared/services/task-form.service";
import { statesProcess } from "@shared/models/statesRequest.model";
import { Router } from '@angular/router';
import { uiFormComponents, uiForms } from "@shared/constants/dynamicForm";
import { UserService } from "@core/services/user.service";
import { environment } from "@environments/environment";
import { CodeInputModalComponent } from "@shared/components/organisms/code-input-modal/code-input-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-user-task-form',
  templateUrl: './user-task-form.component.html',
  styleUrls: ['./user-task-form.component.scss']
})
export class UserTaskFormComponent implements OnInit {
  @ViewChild('loadingTaskSubmitMessage', { static: false }) loadingTaskSubmitMessage: ElementRef;

  idTask: string = '';
  taskInfo: any = null;
  taskProcessState: statesProcess = 'init';
  dataForm: any = null;
  valuesForm: any = null;
  formTaskProcessState: statesProcess = 'init';
  submitFormProcess: statesProcess = 'init';
  submitMessage: string = '';
  originServer = environment.apiUrl;
  messageErrorForm: string = '';

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef, private taskFormService: TaskFormService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.idTask = params['idTask'];
      this.taskProcessState = 'loading'
      this.taskFormService.getTask(this.idTask).subscribe({
        next: (taskData) => {
          this.taskProcessState = 'success';
          this.taskInfo = taskData
          this.getFormTask();
        },
        error: () => {
          this.taskProcessState = 'error';
        }
      })
    });
  }

  getFormTask() {
    this.formTaskProcessState = 'loading'
    forkJoin([
      this.taskFormService.getFieldsFormByIdTask(this.idTask),
      this.taskFormService.getValuesTaskForm(this.idTask),

    ]).pipe(
      catchError((error) => {
        this.formTaskProcessState = 'error';
        return throwError(error);
      })
    ).subscribe(
      ([dataForm, dataValues]) => {
        this.formTaskProcessState = 'success';
        this.dataForm = dataForm
        this.valuesForm = dataValues
        console.log('informacion tareas', this.dataForm,
          this.valuesForm)
      },
    );
  }

  signDocument = ({ variables, component, isValidForm }: any): Observable<any> => {
    if (!isValidForm()) return
    const username = this.userService.getUser()?.username
    const codeInputRef = this.dialog.open(CodeInputModalComponent, {
      width: '500px',
    });
    codeInputRef.afterClosed().subscribe(result => {
      if (result?.isValidCode) {
        this.submitFormProcess = 'loading'
        this.submitMessage = 'Firmando Documento y enviando tarea'
        this.scrollIntoLoadingFormMessage();

        this.taskFormService.signDocument({
          processInstanceId: this.taskInfo.processInstanceId,
          idTask: this.taskInfo.id,
          username,
          nameDocument: component?.properties?.nameDocument,
          keyReplace: component?.properties?.keyReplace
        }, variables).subscribe({
          next: () => {
            this.submitFormProcess = 'success'
            this.router.navigate(['/tareas-pendientes'])
          },
          error: (error) => {
            this.messageErrorForm = error?.error === 'string' ? error.error : 'Ha ocurrido un error al firmar el documento y envíar la tarea, intente de nuevo';
            this.submitFormProcess = 'error';
            this.submitMessage = error ?? 'Ha habido un error al firmar documento y enviar tarea';
          }
        })
      }
    });
  }
  completeTask = ({ variables, isValidForm }: any): string => {
    this.messageErrorForm = '';
    if (!isValidForm()) return this.messageErrorForm = 'Ha ocurrido un error, por favor llene los campos obligatorios';
    this.submitFormProcess = 'loading'
    this.submitMessage = 'Completando tarea...'
    this.scrollIntoLoadingFormMessage();

    this.taskFormService.completeTask(this.idTask, { variables }).subscribe({
      next: () => {
        this.submitFormProcess = 'success';
        this.router.navigate(['/tareas-pendientes']);
      },
      error: (error) => {
        this.messageErrorForm = error?.error === 'string' ? error.error : 'Ha ocurrido un error al completar la tarea, intente de nuevo';
        this.submitFormProcess = 'error';
        this.submitMessage = error ?? 'Ha habido un error al completar la tarea';
      }
    })
  }
  saveTask = ({ variables }: any) => {
    this.submitFormProcess = 'loading'
    this.submitMessage = 'Guardando tarea...'
    this.scrollIntoLoadingFormMessage();

    this.taskFormService.saveTask(this.taskInfo.processInstanceId, { modifications : variables }).subscribe({
      next: () => {
        this.submitFormProcess = 'success';
        this.router.navigate(['/tareas-pendientes']);
      },
      error: (error) => {
        this.messageErrorForm = error?.error === 'string' ? error.error : 'Ha ocurrido un error al guardar la tarea, intente de nuevo';
        this.submitFormProcess = 'error';
        this.submitMessage = error ?? 'Ha habido un error al guardar la tarea';
      }
    })
  }
  scrollIntoLoadingFormMessage() {
    this.cdr.detectChanges()
    this.loadingTaskSubmitMessage.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  protected readonly uiForms = uiForms;
  protected readonly uiFormComponents = uiFormComponents;
}
