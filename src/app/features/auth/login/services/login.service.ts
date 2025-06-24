import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { LoginUser, ResponseLogin } from "../models/login.model";
import { switchMap, tap } from "rxjs";
import { TokenService } from "@core/services/token.service";
import { UserService } from "@core/services/user.service";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  apiUrl = environment.apiUrl;
  model = "Authentication";

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  /**
   * Login by username
   * @param { LoginUser } { username, password } - user data
   * @returns { Observable } - data response of request
   */
  loginByUsername({ username, password }: LoginUser) {
    return this.http
      .post<any>(`${this.getUrl()}/login`, { username, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response?.access_token || '')),
        tap((response) => this.userService.setUser(response?.user)),
        tap((response) => {
          // Asignacion del expirationDate para el token de un día
          const token = this.tokenService.getToken();
          const tokenInfo: any = jwtDecode(token);
          const expirationDate = new Date(tokenInfo.exp * 1000);

          const rolesActor = response.user.roles.filter(role => role.type == 'Actor');
          this.userService.setRoles(rolesActor)
          this.userService.setCurrentRole(rolesActor[0])

          localStorage.setItem('tokenExpiration', expirationDate.toString());
          this.tokenService.initTokenCheck();
        }),
      );
  }
  /**
   * Change password
   * @param { userId: string, newPassword: string } - user data
   * @returns { Observable } - data response of request
   */
  changePassword({ userId, newPassword }: { userId: string; newPassword: string }) {
    return this.http.post(`${this.getUrl()}/change-password`, { userId, newPassword });
  }

  getUrl() {
    return `${this.apiUrl}/${this.model}`;
  }
}
