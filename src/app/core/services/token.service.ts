import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NAME_TOKEN_LOGIN } from "@core/constants/token.constant";
import { interval, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TokenService {

  private tokenCheckSubscription?: Subscription;

  constructor(
    private router: Router,
  ) { }

  initTokenCheck(): void {
    this.tokenCheckSubscription = interval(3600000).subscribe(() => {
      const expirationDate = localStorage.getItem('tokenExpiration');
      const expirationDateParsed = new Date(Number(expirationDate));
      const currentDate = new Date();
      if (expirationDateParsed < currentDate) {
        localStorage.clear();
        this.router.navigate(["/login"]);
        this.stopTokenCheck();
      }
    })
  }

  stopTokenCheck(): void {
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
      this.tokenCheckSubscription = undefined;
    }
  }

  saveToken(token: string) {
    localStorage.setItem(NAME_TOKEN_LOGIN, token);
  }

  getToken() {
    const token = localStorage.getItem(NAME_TOKEN_LOGIN);
    return token;
  }

  removeToken() {
    localStorage.removeItem(NAME_TOKEN_LOGIN);
  }
}
