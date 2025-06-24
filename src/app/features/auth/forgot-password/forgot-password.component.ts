import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  actualUsername: string = ''

  actualModeRecoveryPassword : 'generate-code' | 'validate-code' = 'generate-code'

  changeModeRecoveryPassword(mode: 'generate-code' | 'validate-code') {
    this.actualModeRecoveryPassword = mode
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changeActualUsername(username : string){
    this.actualUsername  = username;
  }
}
