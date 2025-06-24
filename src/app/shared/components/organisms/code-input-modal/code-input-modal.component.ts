import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CodeInputComponent, CodeInputModule} from "angular-code-input";
import {
  SignDocumentCodeInputService
} from "@shared/components/organisms/code-input-modal/services/sign-document-code-input.service";
import {NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const LENGTH_CODE = 6;
@Component({
  selector: 'app-code-input-modal',
  templateUrl: './code-input-modal.component.html',
  styleUrls: ['./code-input-modal.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, NgIf, CodeInputModule, MatProgressSpinnerModule]
})
export class CodeInputModalComponent implements OnInit {

  statusGenerateCode  = 'init';
  statusVerifyCode  = 'init';
  inputCodeUser = '';
  errorInputCodeUser = false;

  constructor(private SignDocumentCodeInputService: SignDocumentCodeInputService, public dialogRef : MatDialogRef<CodeInputComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {
  }

  ngOnInit(): void {
    this.statusGenerateCode = 'success';
  }

  generateCodeDocument() {
    this.errorInputCodeUser = false;
    this.statusGenerateCode = 'init';
    this.statusVerifyCode = 'init';
    this.inputCodeUser = '';

    this.statusGenerateCode = 'loading';
    this.SignDocumentCodeInputService.getVerificationCode().subscribe({
      next: (data) => {
        this.statusGenerateCode = 'success';
      },
      error: (error) => {
        this.statusGenerateCode = 'error';
      }
    })
  }

  verifyCodeDocument() {
    if(this.inputCodeUser.length < LENGTH_CODE){
      this.errorInputCodeUser = true;
      return;
    }
    this.statusVerifyCode = 'loading';
    this.SignDocumentCodeInputService.validateCode(this.inputCodeUser).subscribe({
      next: (data) => {
        this.statusVerifyCode = 'success';
        this.dialogRef.close({isValidCode : true})
      },
      error: (error) => {
        this.statusVerifyCode = 'error';
      }
    })
  }
 onCodeChanged(code) {
    this.inputCodeUser = code;
  }
  onCodeCompleted(code) {
    this.inputCodeUser = code;
    this.errorInputCodeUser = false;
  }
}
