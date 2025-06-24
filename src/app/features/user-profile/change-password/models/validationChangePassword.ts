export interface InfoChangePasswordValidation {
  codeOtp : number;
  newPassword : string
}

export interface InfoRequestChangePasswordValidation {
  oldPassword : string
}
