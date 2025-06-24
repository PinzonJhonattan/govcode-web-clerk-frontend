import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ManageUsersService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Get users
     * @returns { Observable } - data response of request
     */
    getUsers(): Observable<any> {
        return this.http.get(`${this.getUrl()}/clerk/users/get-users`);
    }

    /**
     * Get user by id
     * @param { number } id - user id
     * @returns { Observable } - data response of request
     */
    getUserById(id: string): Observable<any> {
        return this.http.get(`${this.getUrl()}/clerk/users/get-user-by-id/${id}`);
    }

    /**
     * Create user
     * @param { any } user - user data
     * @returns { Observable } - data response of request
     */
    createUser(user: any): Observable<any> {
        return this.http.post(`${this.getUrl()}/clerk/users/create-user`, user);
    }

    /**
     * Update user
     * @param { number } id - user id
     * @param { any } user - user data
     * @returns { Observable } - data response of request
     */
    updateUser(id: string, user: any): Observable<any> {
        return this.http.put(`${this.getUrl()}/clerk/users/edit-user/${id}`, user);
    }

    /**
     * Delete user
     * @param { number } id - user id
     * @returns { Observable } - data response of request
     */
    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.getUrl()}/users/delete-user/${id}`);
    }

    getUrl() {
        return `${this.apiUrl}`;
    }

}
