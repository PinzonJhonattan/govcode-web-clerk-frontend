import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  apiUrl: string = environment.apiUrlNest;
  menuId: string = '682cd2d2f5f855600f57d26a';
  constructor(private http: HttpClient) { }

  getMenu(): Observable<any> {
    console.log(`${this.apiUrl}menus/682cd2d2f5f855600f57d26a`);

    return this.http.get<any>(`${this.apiUrl}menus/682cd2d2f5f855600f57d26a`).pipe(
      retry(2),
      catchError(error => {
        console.error('Error fetching menu', error);
        const cachedMenu = localStorage.getItem('navigationItems');
        if (cachedMenu) {
          try {
            return of(JSON.parse(cachedMenu));
          } catch (e) {
            console.error('Error parsing cached menu', e);
          }
        }
        return throwError(() => new Error('Failed to load menu'));
      }),
      tap(menu => {
        console.log('Menu fetched successfully');
      })
    );
  }

  saveMenu(menuData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}menus/${this.menuId}`, menuData).pipe(
      catchError(error => {
        console.error('Error saving menu', error);
        return throwError(() => new Error('Failed to save menu'));
      }),
      tap(result => {
        console.log('Menu saved successfully');
      })
    );
  }
}
