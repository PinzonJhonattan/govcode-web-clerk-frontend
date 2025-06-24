import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { List, ListDTO } from "@core/models/admin-lists.model";
import { Procedure, ProcedureDTO } from "@core/models/procedure.model";
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AdminListsService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get() {
        return this.http
            .get<List>(this.getUrl() + '/List')
    }

    getById(id: number) {
        return this.http
            .get<List>(this.getUrl() + '/List/' + id)
    }

    post(body: ListDTO) {
        return this.http
            .post<any>(this.getUrl() + '/List', body)
    }

    put(id: number, body: ListDTO) {
        return this.http
            .put<any>(this.getUrl() + '/List/' + id, body)
    }

    delete(id: number) {
        return this.http
            .delete<any>(this.getUrl() + '/List/' + id)
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}