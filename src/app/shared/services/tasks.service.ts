import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  apiUrl: string = environment.apiUrl;
  model : string = 'Task'
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get(`${this.getUrl()}/AllTask`);
  }

  assignTask(idTask, userInfo) {
    return this.http.post(`${this.getUrl()}/TaskAssign/${idTask}`, userInfo );
  }

  deallocateTask(idTask, userInfo) {
    return this.http.post(`${this.getUrl()}/TaskUnassign/${idTask}`, userInfo );
  }

  taskWorkLoad() {
    return this.http.get(`${this.getUrl()}/WorkLoad`);
  }

  taskWorkLoadByRole(role) {
    return this.http.get(`${this.getUrl()}/WorkLoadByRole/${role}`);
  }

  getUrl() {
    return `${this.apiUrl}/${this.model}`;
  }
}
