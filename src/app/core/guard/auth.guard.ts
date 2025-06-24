import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenService } from "@core/services/token.service";
import jwt_decode from 'jwt-decode'; // Importa jwt-decode para decodificar el token

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  /**
   * Verify if token exist, to allow access to page, if not redirect to Login
   * @returns {boolean} Result of token verification
   */
  canActivate(): boolean {
    const token = this.tokenService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken: any = jwt_decode(token);

      if (decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          this.router.navigate(['/login']);
          return false;
        }
      }

      return true;

    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
