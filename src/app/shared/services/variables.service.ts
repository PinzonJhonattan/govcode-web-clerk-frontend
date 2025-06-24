import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  apiUrl: string = environment.apiUrl;
  model : string = 'Variables'
  constructor(private http: HttpClient) {}

  getProcedureDocuments(idInstanceProcess) {
    return this.http.get(`${this.getUrl()}/process-instanced-files?radicate=${idInstanceProcess}`);
  }
  getUrl() {
    return `${this.apiUrl}/${this.model}`;
  }
}
