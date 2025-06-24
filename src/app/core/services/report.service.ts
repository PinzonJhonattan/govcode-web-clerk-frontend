import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Procedure, ProcedureDTO } from "@core/models/procedure.model";
import { ReportTypeDTO, ReportTypes } from "@core/models/report-types.model";
import { ReportDTO } from "@core/models/report.model";
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get() {
        return this.http
            .get<ReportTypes[]>(this.getUrl() + '/Reports')
    }

    getById(id: number) {
        return this.http
            .get<ReportTypes>(this.getUrl() + '/Reports/' + id)
    }

    getDynamicReport(route: string) {
        return this.http
            .get<ReportTypes>(this.getUrl() + route)
    }

    post(body: ReportDTO) {
        return this.http
            .post<any>(this.getUrl() + '/Reports', body)
    }

    put(id: number, body: any) {
        return this.http
            .put<any>(this.getUrl() + '/Reports/' + id, body)
    }

    delete(id: number) {
        return this.http
            .delete<any>(this.getUrl() + '/Reports/' + id)
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}