import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Procedure, ProcedureDTO } from "@core/models/procedure.model";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorizedUsersService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get() {
        return this.http
            .get<Procedure>(this.getUrl() + '/AuthorizedUsers')
    }

    getById(id: number) {
        return this.http
            .get<Procedure>(this.getUrl() + '/AuthorizedUsers/' + id)
    }

    getBiaRoles() {
        return this.http
            .get<any>(this.getUrl() + '/BiaRoles/getUsersToLicenseByRole/zCamunda - Rol Actor-Funcionario')
    }

    post(body: any) {
        return this.http
            .post<any>(this.getUrl() + '/AuthorizedUsers', body)
    }

    put(id: number, body: any) {
        return this.http
            .put<any>(this.getUrl() + '/AuthorizedUsers/' + id, body)
    }

    delete(id: number) {
        return this.http
            .delete<any>(this.getUrl() + '/AuthorizedUsers/' + id)
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}