import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TaskFormService} from "@shared/services/task-form.service";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-input-editor',
  templateUrl: './input-editor.component.html',
  styleUrls: ['./input-editor.component.scss']
})
export class InputEditorComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() downloadTemplate : string = '';

  processId = '';
  idTask: string = ''
  valueEditor  : string = '';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private taskFormService: TaskFormService) {
  }

  ngOnInit(): void {
    if(this.downloadTemplate){
      this.activatedRoute.params.subscribe((params) => {
        this.idTask = params.idTask;
        this.taskFormService.getTask(this.idTask).subscribe({
          next: (taskData) => {
            this.processId = taskData.processInstanceId
            this.getTemplate()
          },
          error: () => {
          }
        });
      })
    }else{
      this.valueEditor = this.value;
    }
  }
  getTemplate(){
    this.http.get(`${environment.apiUrl}/Convert/convertDocxToHtml/${this.downloadTemplate}/${this.processId}`).subscribe({
      next: (data : any) => {
        this.valueEditor = data?.html;
      },
      error: () => {
      }
    })
  }
}
