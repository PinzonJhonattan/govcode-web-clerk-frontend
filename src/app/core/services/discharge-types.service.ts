import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Procedure, ProcedureDTO } from "@core/models/procedure.model";
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DischargeTypesService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get() {
        return this.http
            .get<Procedure>(this.getUrl() + '/List/discharge-types')
    }

    getById(id: number) {
        return this.http
            .get<Procedure>(this.getUrl() + '/List/discharge-types/' + id)
    }

    post(body: ProcedureDTO) {
        return this.http
            .post<any>(this.getUrl() + '/List/discharge-types', body)
    }

    put(id: number, body: ProcedureDTO) {
        return this.http
            .put<any>(this.getUrl() + '/List/discharge-types/' + id, body)
    }

    delete(id: number) {
        return this.http
            .delete<any>(this.getUrl() + '/List/discharge-types/' + id)
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}