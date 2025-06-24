import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PersonTypes, PersonTypesDTO, ProcedureType } from "@core/models/lists";
import { Procedure, ProcedureDTO } from "@core/models/procedure.model";
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProcedureTypesService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<PersonTypesDTO[]>(this.getUrl() + '/List/procedure-types');
    }

    getById(id: number) {
        return this.http
            .get<ProcedureType>(this.getUrl() + '/List/procedure-types/' + id);
    }

    post(personType: PersonTypesDTO) {
        return this.http.post(this.getUrl() + '/List/procedure-types', personType);
    }

    put(id: number,personType: PersonTypes) {
        return this.http.put(this.getUrl() + '/List/procedure-types/' + id, personType);
    }

    delete(id: number) {
        return this.http.delete(this.getUrl() + '/List/procedure-types/' + id);
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}