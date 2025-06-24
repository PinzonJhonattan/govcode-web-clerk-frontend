import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  actualModeChangePassword : 'generate-change-password-code' | 'validate-change-password-code' = 'generate-change-password-code';

  changeModeChangePassword(mode: 'generate-change-password-code' | 'validate-change-password-code') {
    this.actualModeChangePassword = mode
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
