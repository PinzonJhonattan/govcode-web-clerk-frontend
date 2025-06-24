import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";

interface ParamReport {
  urlReport: string;
  parameters: any;
  extension: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}
  apiUrl: string = environment.apiUrl;

  getReport(data: ParamReport) {
    return this.http.post(this.getUrl()+'Reports', data, {
      responseType: 'blob',
      //withCredentials: true, Descomentar
    });
  }

  getUrl() {
    return `${this.apiUrl}/`;
  }
}
