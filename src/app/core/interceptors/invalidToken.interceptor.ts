import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import { TokenService } from "@core/services/token.service";
import { UserService } from "@core/services/user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn : 'root'
})
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>
  {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 403){
/*
          this.router.navigate(['/recurso-no-permitido']);
*/
        }
        if (error.status === 401) {
          this.tokenService.removeToken();
          this.userService.removeUser();
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        // Handle other errors here if needed
        throw error;
      })
    );
  }
}
