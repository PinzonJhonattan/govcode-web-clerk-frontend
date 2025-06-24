import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FileUpload } from "@core/models/file.model";
import { Procedure, ProcedureDTO } from "@core/models/procedure.model";
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get() {
        return this.http
            .get<any>(this.getUrl() + '/Documents/get-all-templates')
    }

    getById(id: number) {
        return this.http
            .get<any>(this.getUrl() + '/Documents/get-by-id/' + id)
    }

    post(body: FileUpload) {
        return this.http
            .post<any>(this.getUrl() + '/Documents/create-template', body)
    }

    put(id: number, body: FileUpload) {
        return this.http
            .put<any>(this.getUrl() + '/Documents/update-template/' + id, body)
    }

    delete(id: string) {
        return this.http
            .delete<any>(this.getUrl() + '/Documents/delete-document/' + id)
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}