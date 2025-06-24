import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ManageCitizensService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    /**
     * Get citizens
     * @returns { Observable } - data response of request
     */
    getCitizens(): Observable<any> {
        return this.http.get<any>(`${this.getUrl()}/users/get-users`);
    }

    /**
     *
     * @param { number } id - citizen id
     * @returns { Observable } - data response of request
     */
    getCitizenById(id: string): Observable<any> {
        return this.http.get<any>(`${this.getUrl()}/users/get-user-by-id/${id}`);
    }

    /**
     *
     * @param { any } citizen - citizen data
     * @returns { Observable } - data response of request
     */
    createCitizen(citizen: any): Observable<any> {
        return this.http.post<any>(`${this.getUrl()}/users/create-user`, citizen);
    }

    /**
     *
     * @param { number } id - citizen id
     * @param { any } citizen - citizen data
     * @returns { Observable } - data response of request
     */
    updateCitizen(id: string, citizen: any): Observable<any> {
        return this.http.put<any>(`${this.getUrl()}/users/edit-user/${id}`, citizen);
    }

    /**
     *
     * @param { number } id - citizen id
     * @returns { Observable } - data response of request
     */
    deleteCitizen(id: string): Observable<any> {
        return this.http.delete<any>(`${this.getUrl()}/users/delete-user/${id}`);
    }

    changePassword({ userId, newPassword }: { userId: string; newPassword: string }): Observable<any> {
        return this.http.post<any>(`${this.getUrl()}/Authentication/change-password`, { userId, newPassword });
    }

    getUrl(): string {
        return `${this.apiUrl}/user`;
    }
}
