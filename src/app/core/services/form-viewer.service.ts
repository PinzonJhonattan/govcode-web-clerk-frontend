import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormViewerService {
  private apiUrl = environment.apiUrlNest;

  constructor(private http: HttpClient) {}

  getFormsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}formularios`);
  }

  getFormById(formId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}formularios/camunda/${formId}`);
  }

  submitForm(formId: string, values: any): Observable<any> {
    return this.http.post(`${this.apiUrl}formularios/submit`, { formId, values });
  }
}
