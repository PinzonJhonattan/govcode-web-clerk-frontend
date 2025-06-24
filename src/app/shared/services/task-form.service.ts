import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import {TaskVariables, TaskVariablesModification, ValuesTaskForm} from "@shared/models/task.model";

@Injectable({
  providedIn: "root",
})
export class TaskFormService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get task properties by id task
   * @param {string} id - id task
   * @returns {Observable} - data response of request
   */
  getTask(id: string) {
    return this.http.get<any>(`${this.getUrl()}/Task/task/${id}`);
  }

  /**
   * Get fields of form task
   * @param {string} id - id task
   * @returns {Observable} - data response of request
   */
  getFieldsFormByIdTask(id: string) {
    return this.http.get<any>(
      `${this.getUrl()}/Task/deployed-form/${id}`
    );
  }

  /**
   * Get values of form fields
   * @param {string} idTask - id task
   * @returns {Observable} - data response of request
   */
  getValuesTaskForm(idTask: string) {
    return this.http.get<ValuesTaskForm>(
      `${this.getUrl()}/Task/form-variables/${idTask}`
    );
  }
  /**
   * Get binary file of a task
   * @param {string} idTask - id task
   * @param {string} variableName - name of variable field form
   * @returns {Observable} - data response of request
   */
  getFileTask(idTask: string, variableName: string) {
    return this.http.get(
      `${this.getUrl()}/Task/binary/${idTask}/${variableName}`
    );
  }

  /**
   * Call complete task endpoint, sending variables form task
   * @param {string} idTask - id task
   * @param {TaskVariables} data - variables of form task
   * @returns {Observable} - data response of request
   */
  completeTask(idTask: string, data: TaskVariables) {
    return this.http.post(`${this.getUrl()}/Task/CompleteTask/${idTask}`, data);
  }

  saveTask(idTask: string, data: TaskVariablesModification) {
    return this.http.post(`${this.getUrl()}/Variables/process-instanced/variableBinary/${idTask}`, data);
  }

  signDocument({nameDocument, keyReplace, processInstanceId, username, idTask}, variables) {
    return this.http.post<any>(`${this.getUrl()}/Documents/sign-documents-complete-task/${nameDocument}/${keyReplace}/${processInstanceId}/${username}/${idTask}`, {
      variables
    });
  }

  getDynamicValuesSelect(url){
    return this.http.get(`${this.getUrl()}/${url}`)
  }

  getUrl() {
    return `${this.apiUrl}`;
  }
}
