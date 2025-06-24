import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Procedure, ProcedureDTO } from "@core/models/procedure.model";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProceduresService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get() {
        return this.http
            .get<Procedure>(this.getUrl() + '/procedures')
    }

    getById(id: number) {
        return this.http
            .get<Procedure>(this.getUrl() + '/procedures/' + id)
    }

    post(body: ProcedureDTO) {
        return this.http
            .post<any>(this.getUrl() + '/procedures', body)
    }

    put(id: number, body: ProcedureDTO) {
        return this.http
            .put<any>(this.getUrl() + '/procedures/' + id, body)
    }

    delete(id: number) {
        return this.http
            .delete<any>(this.getUrl() + '/procedures/' + id)
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}