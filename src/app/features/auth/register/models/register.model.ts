import {FormControl} from "@angular/forms";

export interface RegisterModelDTO {
  username: string;
  firstName : string;
  lastName : string;
  email: string;
  password: string;
}


export interface RegisterUserForm {
  username: FormControl<string>
  firstName : FormControl<string>
  lastName : FormControl<string>
  email: FormControl<string>
  password: FormControl<string>
  passwordRepeat : FormControl<string>
  isHuman: FormControl<boolean>
}
