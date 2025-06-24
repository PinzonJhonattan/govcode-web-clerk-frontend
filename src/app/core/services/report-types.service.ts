import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Procedure, ProcedureDTO } from "@core/models/procedure.model";
import { ReportTypeDTO, ReportTypes } from "@core/models/report-types.model";
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ReportTypesService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get() {
        return this.http
            .get<ReportTypes[]>(this.getUrl() + '/Reports/report-types')
    }

    getById(id: number) {
        return this.http
            .get<ReportTypes>(this.getUrl() + '/Reports/report-types/' + id)
    }

    post(body: ReportTypeDTO) {
        return this.http
            .post<any>(this.getUrl() + '/Reports/report-types', body)
    }

    put(id: number, body: ReportTypeDTO) {
        return this.http
            .put<any>(this.getUrl() + '/Reports/report-types/' + id, body)
    }

    delete(id: number) {
        return this.http
            .delete<any>(this.getUrl() + '/Reports/report-types/' + id)
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}