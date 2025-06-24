import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {TaskFormService} from "@shared/services/task-form.service";

@Component({
  selector: 'app-input-document-template-viewer',
  templateUrl: './input-document-template-viewer.component.html',
  styleUrls: ['./input-document-template-viewer.component.scss']
})
export class InputDocumentTemplateViewerComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() label: string = "";
  @Input() name: string = "";
  @Input() templateName: string = ''
  processId = '';
  idTask: string = ''

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private taskFormService: TaskFormService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.idTask = params.idTask;
      this.taskFormService.getTask(this.idTask).subscribe({
        next: (taskData) => {
          this.processId = taskData.processInstanceId
        },
        error: () => {
        }
      });
    })
  }

  getDocument() {
    this.http.get(`${environment.apiUrl}/Documents/generate-template/${this.templateName}/${this.processId}`, {
      responseType: 'blob' as 'json'
    }).subscribe({
      next: (data) => {
        this.base64toBlob(data)
      },
      error: () => {
      }
    })
  }

  base64toBlob = (data: any) => {

    const downloadURL = window.URL.createObjectURL(new Blob([data], {type: data.type}));
    let link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.templateName;
    link.click();
  }
}
